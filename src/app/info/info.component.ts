import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import Decimal from 'decimal.js';
import { CoinInfoI } from '../store/coins/coin-info.model';
import { CoinInfoSelectors } from '../store/coins/coin-info.selectors';
import { PortfolioI } from '../store/portfolio/portfolio.model';
import { PortfolioSelectors } from '../store/portfolio/portfolio.selectors';
import { WalletsApiActions } from '../store/wallets/wallets.action';
import { WalletI } from '../store/wallets/wallets.model';
import { WalletsSelectors } from '../store/wallets/wallets.selectors';
import { WalletTableRowI, WalletsTableDataI } from './info.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent {
  private readonly store = inject(Store);

  portfolio = this.store.selectSignal(PortfolioSelectors.selectCurrentPortfolio);
  wallet = this.store.selectSignal(WalletsSelectors.selectWallets);

  private fetchWalletDataEffect = effect(() => {
    const portfolioId = this.portfolio()?.id;
    if (!portfolioId) return;

    const walletPortfolioId = this.store.selectSignal(WalletsSelectors.selectPortfolioId);

    if (walletPortfolioId() !== portfolioId) {
      this.store.dispatch(WalletsApiActions.loadWallets({ portfolioId }));
    }
  });

  tableData = computed(() => {
    const coins = this.store.selectSignal(CoinInfoSelectors.selectCoinInfos);
    return this.mapWalletTableData(this.portfolio(), this.wallet(), coins());
  });

  displayedColumns: string[] = ['id', 'coin', 'total', 'avcoFiatPerUnit', 'earnOrLoss'];

  private mapWalletTableData(portfolio: PortfolioI | undefined, wallets: WalletI[], coins: Dictionary<CoinInfoI>): WalletsTableDataI {
    if (!portfolio || !wallets || !coins) {
      return {
        rows: [],
        fiat: '',
        fiatImagePath: '',
        totalEarnOrloss: '0',
      };
    }

    const rows = wallets.map<WalletTableRowI>((wallet) => this.mapWalletToWalletTableRow(wallet, coins));
    const totalEarnOrloss = this.getTotalEarnOrLoss(rows);
    const fiat = portfolio.fiat;
    const fiatImagePath = coins[fiat]?.imagePath;

    return {
      rows,
      totalEarnOrloss: totalEarnOrloss,
      fiat,
      fiatImagePath: fiatImagePath ? fiatImagePath : '',
    };
  }

  private mapWalletToWalletTableRow(wallet: WalletI, coins: Dictionary<CoinInfoI>): WalletTableRowI {
    const coinImagePath = coins[wallet.coin]?.imagePath;
    return {
      id: wallet.id,
      coin: wallet.coin,
      coinImagePath: coinImagePath ? coinImagePath : '',
      avcoFiatPerUnit: wallet.avcoFiatPerUnit,
      total: this.calculateWalletTotal(wallet),
      earnOrLoss: this.calculateWalletEarnOrLoss(wallet, coins[wallet.coin]),
    };
  }

  private calculateWalletTotal(wallet: WalletI): string {
    return new Decimal(wallet.amount).mul(new Decimal(wallet.avcoFiatPerUnit)).toString();
  }

  private calculateWalletEarnOrLoss(wallet: WalletI, coinInfo: CoinInfoI | undefined): string {
    if (!coinInfo) {
      return '0';
    }

    const paidPrice = new Decimal(wallet.amount).mul(new Decimal(wallet.avcoFiatPerUnit));
    const currentPrice = new Decimal(wallet.amount).mul(new Decimal(coinInfo.priceInFiat));

    return paidPrice.minus(currentPrice).toFixed(8);
  }

  private getTotalEarnOrLoss(rows: WalletTableRowI[]): string {
    let totalEarnOrLoss = new Decimal(0);

    rows.forEach((row) => {
      totalEarnOrLoss = totalEarnOrLoss.plus(new Decimal(row.earnOrLoss));
    });

    return totalEarnOrLoss.toFixed(8);
  }
}

import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import Decimal from 'decimal.js';
import { EMPTY, Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CoinInfo } from '../store/coins/coin-info.model';
import { CoinInfoStoreType } from '../store/coins/coin-info.reducer';
import { CoinInfoSelectors } from '../store/coins/coin-info.selectors';
import { PortfolioApiActions } from '../store/portfolio/portfolio.actions';
import { PortfolioI, WalletI } from '../store/portfolio/portfolio.model';
import { PortfolioSelectors } from '../store/portfolio/portfolio.selectors';
import { WalletTableDataI, WalletTableRowI } from './info.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  private readonly store = inject(Store);

  portfolio$ = this.store.select(PortfolioSelectors.selectPortfolioDataFeature).pipe(
    switchMap((p) => {
      const portfolioId = p.currentPortfolioName?.id;

      if (portfolioId && p.portfolio?.id === portfolioId) {
        return this.store.select(PortfolioSelectors.selectPortfolio);
      } else if (portfolioId) {
        this.store.dispatch(PortfolioApiActions.loadPortfolio({ portfolioId }));
        return this.store.select(PortfolioSelectors.selectPortfolio);
      }

      return EMPTY;
    }),
  );
  private coins$ = this.store.select(CoinInfoSelectors.selectCoinInfoFeature);

  tableData$: Observable<WalletTableDataI> = combineLatest([this.portfolio$, this.coins$]).pipe(map((data) => this.mapWalletTableData(data)));

  displayedColumns: string[] = ['id', 'coin', 'total', 'avcoFiatPerUnit', 'earnOrLoss'];

  private mapWalletTableData(data: [PortfolioI | undefined, CoinInfoStoreType]): WalletTableDataI {
    const portfolio = data[0];
    const coins = data[1];

    if (!portfolio || !coins) {
      return {
        rows: [],
        fiat: '',
        fiatImagePath: '',
        totalEarnOrloss: '0',
      };
    }

    const rows = portfolio.wallets.map<WalletTableRowI>((wallet) => this.mapWalletToWalletTableRow(wallet, coins));
    const totalEarnOrloss = this.getTotalEarnOrLoss(rows);
    const fiat = portfolio.fiat;
    const fiatImagePath = coins.get(fiat)?.imagePath;

    return {
      rows,
      totalEarnOrloss: totalEarnOrloss,
      fiat,
      fiatImagePath: fiatImagePath ? fiatImagePath : '',
    };
  }

  private mapWalletToWalletTableRow(wallet: WalletI, coins: CoinInfoStoreType): WalletTableRowI {
    const coinImagePath = coins.get(wallet.coin)?.imagePath;
    return {
      id: wallet.id,
      coin: wallet.coin,
      coinImagePath: coinImagePath ? coinImagePath : '',
      avcoFiatPerUnit: wallet.avcoFiatPerUnit,
      total: this.calculateWalletTotal(wallet),
      earnOrLoss: this.calculateWalletEarnOrLoss(wallet, coins.get(wallet.coin)),
    };
  }

  private calculateWalletTotal(wallet: WalletI): string {
    return new Decimal(wallet.amount).mul(new Decimal(wallet.avcoFiatPerUnit)).toString();
  }

  private calculateWalletEarnOrLoss(wallet: WalletI, coinInfo: CoinInfo | undefined): string {
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

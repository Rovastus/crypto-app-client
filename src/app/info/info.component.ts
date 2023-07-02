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
import { PortfolioTableDataI, PortfolioTableRowI } from './info.model';

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

  tableData$: Observable<PortfolioTableDataI> = combineLatest([this.portfolio$, this.coins$]).pipe(map((data) => this.mapPortfolioTableData(data)));

  displayedColumns: string[] = ['id', 'coin', 'total', 'avcoFiatPerUnit', 'profit/loss'];

  private mapPortfolioTableData(data: [PortfolioI | undefined, CoinInfoStoreType]): PortfolioTableDataI {
    const portfolio = data[0];
    const coins = data[1];

    if (!portfolio || !coins) {
      return {
        rows: [],
        fiat: '',
        fiatImagePath: '',
        totalProfitOrloss: '0',
      };
    }

    const rows = portfolio.wallets.map<PortfolioTableRowI>((wallet) => {
      const coinImagePath = coins.get(wallet.coin)?.imagePath;
      return {
        id: wallet.id,
        coin: wallet.coin,
        coinImagePath: coinImagePath ? coinImagePath : '',
        avcoFiatPerUnit: wallet.avcoFiatPerUnit,
        total: this.calculateWalletTotal(wallet),
        profitOrLoss: this.calculateWalletProfitOrLoss(wallet, coins.get(wallet.coin)),
      };
    });
    const totalProfitOrloss = this.getTotalProfitOrLoss(rows);
    const fiat = portfolio.fiat;
    const fiatImagePath = coins.get(fiat)?.imagePath;

    return {
      rows,
      totalProfitOrloss,
      fiat,
      fiatImagePath: fiatImagePath ? fiatImagePath : '',
    };
  }

  private calculateWalletTotal(wallet: WalletI): string {
    return new Decimal(wallet.amount).mul(new Decimal(wallet.avcoFiatPerUnit)).toString();
  }

  private calculateWalletProfitOrLoss(wallet: WalletI, coinInfo: CoinInfo | undefined): string {
    if (!coinInfo) {
      return '0';
    }

    const paidPrice = new Decimal(wallet.amount).mul(new Decimal(wallet.avcoFiatPerUnit));
    const currentPrice = new Decimal(wallet.amount).mul(new Decimal(coinInfo.priceInFiat));

    return paidPrice.minus(currentPrice).toString();
  }

  private getTotalProfitOrLoss(rows: PortfolioTableRowI[]): string {
    let totalProfitOrLoss = new Decimal(0);

    rows.forEach((row) => {
      totalProfitOrLoss = totalProfitOrLoss.plus(new Decimal(row.profitOrLoss));
    });

    return totalProfitOrLoss.toString();
  }
}

import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CoinInfoStoreType } from '../store/coins/coin-info.reducer';
import { CoinInfoSelectors } from '../store/coins/coin-info.selectors';
import { EarnsApiActions } from '../store/earns/earns.action';
import { EarnI } from '../store/earns/earns.model';
import { EarnsSelectors } from '../store/earns/earns.selectors';
import { PortfolioSelectors } from '../store/portfolio/portfolio.selectors';
import { EarnTableRowI, EarnsTableDataI } from './earns.model';

@Component({
  selector: 'app-earns',
  templateUrl: './earns.component.html',
  styleUrls: ['./earns.component.scss'],
})
export class EarnsComponent {
  private readonly store = inject(Store);

  private earns$ = combineLatest([this.store.select(PortfolioSelectors.selectCurrentPortfolio), this.store.select(EarnsSelectors.selectPortfolioId)]).pipe(
    switchMap((data) => {
      const portfolioId = data[0]?.id;
      const earnPortfolioId = data[1];

      if (!portfolioId) return EMPTY;

      if (earnPortfolioId !== portfolioId) {
        this.store.dispatch(EarnsApiActions.loadEarns({ portfolioId }));
      }

      return this.store.select(EarnsSelectors.selectEarns);
    }),
  );
  private coins$ = this.store.select(CoinInfoSelectors.selectCoinInfoFeature);

  tableData$: Observable<EarnsTableDataI> = combineLatest([this.earns$, this.coins$]).pipe(map((data) => this.mapEarnsTableData(data)));

  displayedColumns: string[] = ['id', 'time', 'amount'];

  private mapEarnsTableData(data: [EarnI[] | undefined, CoinInfoStoreType]): EarnsTableDataI {
    const earns = data[0];
    const coins = data[1];

    if (!earns || !coins) {
      return {
        rows: [],
      };
    }

    const rows = earns.map<EarnTableRowI>((earn) => this.mapEarnToEarnTableRow(earn, coins));

    return {
      rows,
    };
  }

  private mapEarnToEarnTableRow(earn: EarnI, coins: CoinInfoStoreType): EarnTableRowI {
    const amountCoinImagePath = coins.get(earn.amountCoin)?.imagePath;

    return {
      id: earn.id,
      time: earn.time,
      amount: earn.amount,
      amountCoin: earn.amountCoin,
      amountCoinImagePath: amountCoinImagePath ? amountCoinImagePath : '',
    };
  }
}

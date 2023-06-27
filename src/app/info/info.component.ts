import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CoinInfo } from '../store/coins/coin-info.model';
import { CoinInfoStoreType } from '../store/coins/coin-info.reducer';
import { CoinInfoSelectors } from '../store/coins/coin-info.selectors';
import { PortfolioApiActions } from '../store/portfolio/portfolio.actions';
import { PortfolioSelectors } from '../store/portfolio/portfolio.selectors';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  portfolio$!: Observable<any | undefined>;
  coins$: Observable<CoinInfoStoreType>;
  displayedColumns: string[] = ['id', 'coin', 'total', 'avcoFiatPerUnit', 'profit/loss'];

  constructor(private store: Store) {
    this.coins$ = this.store.select(CoinInfoSelectors.selectCoinInfoFeature);
  }

  ngOnInit(): void {
    this.portfolio$ = this.store.select(PortfolioSelectors.selectPortfolioDataFeature).pipe(
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
  }

  public calculateCurrentTotal(amount: number, avcoFiatPerUnit: number, coinInfo: CoinInfo | undefined): number {
    if (coinInfo) {
      return amount * coinInfo.priceInFiat - amount * avcoFiatPerUnit;
    }
    return 0;
  }

  public getTotalProfitLoss(
    wallet: {
      amount: any;
      coin: string;
      avcoFiatPerUnit: any;
    }[],
    coins: Map<string, CoinInfo> | null,
  ): number {
    if (wallet && coins) {
      return wallet.reduce((acc, value) => acc + this.calculateCurrentTotal(value.amount, value.avcoFiatPerUnit, coins.get(value.coin)), 0);
    }
    return 0;
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { PortfolioService } from 'src/app/service/portfolio/portfolio.service';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { CoinInfoApiActions } from '../coins/coin-info.actions';
import { PortfolioActions, PortfolioApiActions } from './portfolio.actions';

@Injectable()
export class PortfolioEffects {
  loadPortfoliosNames$;
  loadPortfolio$;

  constructor(private actions$: Actions, private portfolioService: PortfolioService, private snackBar: SnackBarService) {
    this.loadPortfoliosNames$ = createEffect(() =>
      this.actions$.pipe(
        ofType(PortfolioApiActions.loadPortfoliosNames),
        exhaustMap(() =>
          this.portfolioService.getAllPortfoliosNames().pipe(
            catchError(() => {
              this.snackBar.displayError('Error while loading portfolios');
              return EMPTY;
            }),
            map((portfoliosNames) => PortfolioActions.setPortfoliosNames({ portfoliosNames })),
          ),
        ),
      ),
    );

    this.loadPortfolio$ = createEffect(() =>
      this.actions$.pipe(
        ofType(PortfolioApiActions.loadPortfolio),
        exhaustMap(({ portfolioId }) =>
          this.portfolioService.getPortfolioById(portfolioId).pipe(
            catchError(() => {
              this.snackBar.displayError('Error while loading portfolio');
              return EMPTY;
            }),
            tap((portfolio) => {
              const coins: Set<string> = new Set();
              portfolio.wallets.forEach((wallet) => {
                coins.add(wallet.coin);
              });
              CoinInfoApiActions.loadCoinInfos({ coins });
            }),
            map((portfolio) => PortfolioActions.setPortfolio({ portfolio })),
          ),
        ),
      ),
    );
  }
}

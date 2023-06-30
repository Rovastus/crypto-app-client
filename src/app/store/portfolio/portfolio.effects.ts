import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { PortfolioService } from 'src/app/service/portfolio/portfolio.service';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { CoinInfoApiActions } from '../coins/coin-info.actions';
import { PortfolioActions, PortfolioApiActions } from './portfolio.actions';

@Injectable()
export class PortfolioEffects {

  private readonly actions$ = inject(Actions);
  private readonly portfolioService = inject(PortfolioService);
  private readonly snackBar = inject(SnackBarService);

  loadPortfoliosNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioApiActions.loadPortfoliosNames),
      mergeMap(() => {
        console.log('test2')
        return this.portfolioService.getAllPortfoliosNames().pipe(
          catchError(() => {
            this.snackBar.displayError('Error while loading portfolios');
            return EMPTY;
          }),
          map((portfoliosNames) => PortfolioActions.setPortfoliosNames({ portfoliosNames })),
        );
      }),
    ),
  );

  loadPortfolio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioApiActions.loadPortfolio),
      mergeMap(({ portfolioId }) =>
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

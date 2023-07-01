import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, finalize, map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { PortfolioService } from 'src/app/service/portfolio/portfolio.service';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { CoinInfoApiActions } from '../coins/coin-info.actions';
import { LOADING_FALSE, LOADING_TRUE } from '../constants';
import { PortfolioActions, PortfolioApiActions, PortfolioLoadingActions } from './portfolio.actions';
import { PortfolioNameI } from './portfolio.model';

@Injectable()
export class PortfolioEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly portfolioService = inject(PortfolioService);
  private readonly snackBarService = inject(SnackBarService);

  loadPortfoliosNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioApiActions.loadPortfoliosNames),
      mergeMap(() => {
        return this.portfolioService.getAllPortfoliosNames().pipe(
          takeUntil(this.actions$.pipe(ofType(PortfolioApiActions.loadPortfoliosNames))),
          catchError(() => {
            this.snackBarService.displayError('Error while loading portfolios');
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
          takeUntil(this.actions$.pipe(ofType(PortfolioApiActions.loadPortfolio))),
          catchError(() => {
            this.snackBarService.displayError('Error while loading portfolio');
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

  createPortfolio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioApiActions.createPortfolio),
      tap(() => this.store.dispatch(PortfolioLoadingActions.setCreationPortfolioLoading(LOADING_TRUE))),
      mergeMap(({ portfolio }) => {
        return this.portfolioService.createPortfolio(portfolio).pipe(
          finalize(() => this.store.dispatch(PortfolioLoadingActions.setCreationPortfolioLoading(LOADING_FALSE))),
          catchError(() => {
            this.snackBarService.displayError('Error while loading portfolio');
            return EMPTY;
          }),
          map((portfolio) => {
            this.snackBarService.displayInfo('Portfolio created.');
            const portfolioName: PortfolioNameI = { id: portfolio.createPortfolio.id, name: portfolio.createPortfolio.name };
            return PortfolioActions.addPortfoliosName({ portfolioName });
          }),
        );
      }),
    ),
  );
}

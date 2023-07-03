import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, finalize, map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { PortfolioService } from 'src/app/service/portfolio/portfolio.service';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { LOADING_FALSE, LOADING_TRUE } from '../constants';
import { PortfolioActions, PortfolioApiActions, PortfolioLoadingActions } from './portfolio.actions';

@Injectable()
export class PortfolioEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly portfolioService = inject(PortfolioService);
  private readonly snackBarService = inject(SnackBarService);

  loadPortfolios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioApiActions.loadPortfolios),
      mergeMap(() => {
        return this.portfolioService.getAllPortfolios().pipe(
          takeUntil(this.actions$.pipe(ofType(PortfolioApiActions.loadPortfolios))),
          catchError(() => {
            this.snackBarService.displayError('Error while loading portfolios');
            return EMPTY;
          }),
          map((portfolios) => PortfolioActions.setPortfolios({ portfolios })),
        );
      }),
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
            return PortfolioActions.addPortfolio({ portfolio });
          }),
        );
      }),
    ),
  );
}

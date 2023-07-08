import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, filter, finalize, map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { EARNS_ROUTER_PATH } from 'src/app/app-router.module';
import { EarnsService } from 'src/app/service/earns/earns.service';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { LOADING_FALSE, LOADING_TRUE } from '../constants';
import { PortfolioActions } from '../portfolio/portfolio.actions';
import { EarnsActions, EarnsApiActions, EarnsLoadingActions } from './earns.action';

@Injectable()
export class EarnsEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly earnsService = inject(EarnsService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly router = inject(Router);

  triggerLoadEarns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.setCurrentPortfolio),
      filter(() => this.router.url === '/' + EARNS_ROUTER_PATH),
      map(({ portfolio }) => {
        return EarnsApiActions.loadEarns({ portfolioId: portfolio.id });
      }),
    ),
  );

  loadEarns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EarnsApiActions.loadEarns),
      tap(() => this.store.dispatch(EarnsLoadingActions.setEarnsLoading(LOADING_TRUE))),
      mergeMap(({ portfolioId }) => {
        return this.earnsService.getEarnsByPortfolioId(portfolioId).pipe(
          finalize(() => this.store.dispatch(EarnsLoadingActions.setEarnsLoading(LOADING_FALSE))),
          takeUntil(this.actions$.pipe(ofType(EarnsApiActions.loadEarns))),
          catchError(() => {
            this.snackBarService.displayError('Error while loading earns');
            return EMPTY;
          }),
          map((earns) => EarnsActions.setEarns({ portfolioId, earns })),
        );
      }),
    ),
  );
}

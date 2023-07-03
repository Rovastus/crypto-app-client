import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, finalize, map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { EarnsService } from 'src/app/service/earns/earns.service';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { LOADING_FALSE, LOADING_TRUE } from '../constants';
import { EarnsActions, EarnsApiActions, EarnsLoadingActions } from './earns.action';

@Injectable()
export class EarnsEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly earnsService = inject(EarnsService);
  private readonly snackBarService = inject(SnackBarService);

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

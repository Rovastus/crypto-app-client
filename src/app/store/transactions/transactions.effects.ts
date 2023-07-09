import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, filter, finalize, map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { TRANSACTIONS_ROUTER_PATH } from 'src/app/app-router.module';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { TransactionsService } from 'src/app/service/transactions/transactions.service';
import { LOADING_FALSE, LOADING_TRUE } from '../constants';
import { PortfolioActions } from '../portfolio/portfolio.actions';
import { TransactionsActions, TransactionsApiActions, TransactionsLoadingActions } from './transactions.action';

@Injectable()
export class TransactionsEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly transactionsService = inject(TransactionsService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly router = inject(Router);

  triggerLoadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.setCurrentPortfolio),
      filter(() => this.router.url === '/' + TRANSACTIONS_ROUTER_PATH),
      map(({ portfolio }) => {
        const year = new Date().getFullYear();
        return TransactionsApiActions.loadTransactions({ portfolioId: portfolio.id, year });
      }),
    ),
  );

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsApiActions.loadTransactions),
      tap(() => this.store.dispatch(TransactionsLoadingActions.setTransactionsLoading(LOADING_TRUE))),
      mergeMap(({ portfolioId, year }) => {
        return this.transactionsService.getTransactionsByPortfolioId(portfolioId, year).pipe(
          finalize(() => this.store.dispatch(TransactionsLoadingActions.setTransactionsLoading(LOADING_FALSE))),
          takeUntil(this.actions$.pipe(ofType(TransactionsApiActions.loadTransactions))),
          catchError(() => {
            this.snackBarService.displayError('Error while loading transactions');
            return EMPTY;
          }),
          map((transactions) => TransactionsActions.setTransactions({ portfolioId, transactions })),
        );
      }),
    ),
  );
}

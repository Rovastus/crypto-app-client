import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoadingProp } from '../constants';
import { TransactionI } from './transactions.model';

export const TransactionsActions = createActionGroup({
  source: 'Transactions',
  events: {
    setTransactions: props<{ portfolioId: number; transactions: TransactionI[] }>(),
    clearTransactions: emptyProps(),
  },
});

export const TransactionsLoadingActions = createActionGroup({
  source: 'Transactions Loading',
  events: {
    setTransactionsLoading: props<LoadingProp>(),
  },
});

export const TransactionsApiActions = createActionGroup({
  source: 'Transactions',
  events: {
    loadTransactions: props<{ portfolioId: number; year: number }>(),
  },
});

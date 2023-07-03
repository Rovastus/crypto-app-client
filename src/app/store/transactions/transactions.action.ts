import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoadingProp } from '../constants';
import { TransactionI } from './transactions.model';

export const TransactionsActions = createActionGroup({
  source: 'Transaction',
  events: {
    setTransactions: props<{ portfolioId: number; transactions: TransactionI[] }>(),
    clearTransactions: emptyProps(),
  },
});

export const TransactionsLoadingActions = createActionGroup({
  source: 'Transaction Loading',
  events: {
    setTransactionLoading: props<LoadingProp>(),
  },
});

export const TransactionsApiActions = createActionGroup({
  source: 'Transaction',
  events: {
    loadTransactions: props<{ portfolioId: number }>(),
  },
});

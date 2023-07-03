import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { TransactionsActions, TransactionsLoadingActions } from './transactions.action';
import { TransactionI } from './transactions.model';

export const TRANSACTIONS_DATA_STORE_KEY = 'transactionsData';

export interface TransactionState extends EntityState<TransactionI> {
  portfolioId: number | undefined;
  transactinLoading: boolean;
}

export const transactionsAdapter: EntityAdapter<TransactionI> = createEntityAdapter<TransactionI>();

const initialState: TransactionState = transactionsAdapter.getInitialState({
  portfolioId: undefined,
  transactinLoading: false,
});

export const transactionsDataReducer = createReducer(
  initialState,
  on(TransactionsActions.setTransactions, (state, { portfolioId, transactions }) => {
    return transactionsAdapter.setAll(transactions, { ...state, portfolioId: portfolioId });
  }),
  on(TransactionsActions.clearTransactions, (state) => {
    return transactionsAdapter.removeAll({ ...state, portfolioId: undefined });
  }),
  on(TransactionsLoadingActions.setTransactionsLoading, (state, { loading }) => {
    return { ...state, transactinLoading: loading };
  }),
);

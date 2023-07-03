import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TRANSACTIONS_DATA_STORE_KEY, TransactionState, transactionsAdapter } from './transactions.reducer';

const selectTransactionsDataFeature = createFeatureSelector<TransactionState>(TRANSACTIONS_DATA_STORE_KEY);

const selectPortfolioId = createSelector(selectTransactionsDataFeature, (state: TransactionState) => state.portfolioId);

const selectTransactionsLoading = createSelector(selectTransactionsDataFeature, (state: TransactionState) => state.transactinLoading);

const { selectAll } = transactionsAdapter.getSelectors();

export const TransactionSelectors = {
  selectTransactions: selectAll,
  selectPortfolioId,
  selectTransactionsLoading,
};

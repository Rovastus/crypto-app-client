import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TRANSACTIONS_DATA_STORE_KEY, TransactionsState, transactionsAdapter } from './transactions.reducer';

const selectTransactionsDataFeature = createFeatureSelector<TransactionsState>(TRANSACTIONS_DATA_STORE_KEY);

const selectPortfolioId = createSelector(selectTransactionsDataFeature, (state: TransactionsState) => state.portfolioId);

const selectTransactionsLoading = createSelector(selectTransactionsDataFeature, (state: TransactionsState) => state.transactinLoading);

const { selectAll } = transactionsAdapter.getSelectors(selectTransactionsDataFeature);

export const TransactionsSelectors = {
  selectTransactions: selectAll,
  selectPortfolioId,
  selectTransactionsLoading,
};

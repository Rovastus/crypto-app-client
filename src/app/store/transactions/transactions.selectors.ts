import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TRANSACTIONS_DATA_STORE_KEY, TransactionState, transactionsAdapter } from './transactions.reducer';

const selectTransactionDataFeature = createFeatureSelector<TransactionState>(TRANSACTIONS_DATA_STORE_KEY);

const selectPortfolioId = createSelector(selectTransactionDataFeature, (state: TransactionState) => state.portfolioId);

const selectTransactionLoading = createSelector(selectTransactionDataFeature, (state: TransactionState) => state.transactinLoading);

const { selectEntities } = transactionsAdapter.getSelectors();

export const TransactionSelectors = {
  selectTransactions: selectEntities,
  selectPortfolioId,
  selectTransactionLoading,
};

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EARNS_DATA_STORE_KEY, EarnsState, earnsAdapter } from './earns.reducer';

const selectEarnsDataFeature = createFeatureSelector<EarnsState>(EARNS_DATA_STORE_KEY);

const selectPortfolioId = createSelector(selectEarnsDataFeature, (state: EarnsState) => state.portfolioId);

const selectEarnsLoading = createSelector(selectEarnsDataFeature, (state: EarnsState) => state.earnsLoading);

const { selectAll } = earnsAdapter.getSelectors(selectEarnsDataFeature);

export const EarnsSelectors = {
  selectEarns: selectAll,
  selectPortfolioId,
  selectEarnsLoading,
};

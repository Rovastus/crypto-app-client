import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PORTFOLIOS_DATA_STORE_KEY, PortfoliosState, portfoliosAdapter } from './portfolio.reducer';

const selectPortfoliosDataFeature = createFeatureSelector<PortfoliosState>(PORTFOLIOS_DATA_STORE_KEY);

const selectCurrentPortfolio = createSelector(selectPortfoliosDataFeature, (state: PortfoliosState) => state.currentPortfolio);

const selectCreationPortfolioLoading = createSelector(selectPortfoliosDataFeature, (state: PortfoliosState) => state.creationPortfolioLoading);

const { selectAll } = portfoliosAdapter.getSelectors();

export const PortfolioSelectors = {
  selectPortfoliosDataFeature,
  selectPortfolios: selectAll,
  selectCurrentPortfolio,
  selectCreationPortfolioLoading,
};

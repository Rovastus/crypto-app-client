import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PortfolioDataStoreType, Portfolio_DATA_STORE_KEY } from './portfolio.reducer';

const selectPortfolioDataFeature = createFeatureSelector<PortfolioDataStoreType>(Portfolio_DATA_STORE_KEY);

const selectCurrentPortfolioName = createSelector(selectPortfolioDataFeature, (state: PortfolioDataStoreType) => state.currentPortfolioName);

const selectPortfolio = createSelector(selectPortfolioDataFeature, (state: PortfolioDataStoreType) => state.portfolio);

const selectPortfoliosNames = createSelector(selectPortfolioDataFeature, (state: PortfolioDataStoreType) => state.portfoliosNames);

const selectCreationPortfolioLoading = createSelector(selectPortfolioDataFeature, (state: PortfolioDataStoreType) => state.creationPortfolioLoading);

export const PortfolioSelectors = {
  selectPortfolioDataFeature,
  selectCurrentPortfolioName,
  selectPortfolio,
  selectPortfoliosNames,
  selectCreationPortfolioLoading,
};

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WALLETS_DATA_STORE_KEY, WalletsState, walletsAdapter } from './wallets.reducer';

const selectWalletsDataFeature = createFeatureSelector<WalletsState>(WALLETS_DATA_STORE_KEY);

const selectPortfolioId = createSelector(selectWalletsDataFeature, (state: WalletsState) => state.portfolioId);

const selectWalletsLoading = createSelector(selectWalletsDataFeature, (state: WalletsState) => state.walletsLoading);

const { selectAll } = walletsAdapter.getSelectors();

export const WalletsSelectors = {
  selectWallets: selectAll,
  selectPortfolioId,
  selectWalletsLoading,
};

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { COIN_PAIR_STORE_KEY, CoinPairStoreType } from './coin-pair.reducer';

const selectCoinPairFeature = createFeatureSelector<CoinPairStoreType>(COIN_PAIR_STORE_KEY);

const selectInitBinanceCoinPairsLoading = createSelector(selectCoinPairFeature, (state: CoinPairStoreType) => state.initBinanceCoinPairsLoading);
const selectImportKrakenCoinPairLoading = createSelector(selectCoinPairFeature, (state: CoinPairStoreType) => state.importKrakenCoinPairLoading);

export const CoinPairSelectors = {
  selectCoinPairFeature,
  selectInitBinanceCoinPairsLoading,
  selectImportKrakenCoinPairLoading,
};

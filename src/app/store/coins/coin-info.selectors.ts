import { createFeatureSelector } from '@ngrx/store';
import { COIN_INFO_STORE_KEY, CoinInfoStoreType } from './coin-info.reducer';

const selectCoinInfoFeature = createFeatureSelector<CoinInfoStoreType>(COIN_INFO_STORE_KEY);

export const CoinInfoSelectors = {
  selectCoinInfoFeature
}
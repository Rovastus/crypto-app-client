import { EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { CoinInfoI } from './coin-info.model';
import { COIN_INFO_STORE_KEY, coinInfoAdapter } from './coin-info.reducer';

const selectCoinInfoFeature = createFeatureSelector<EntityState<CoinInfoI>>(COIN_INFO_STORE_KEY);
const { selectEntities } = coinInfoAdapter.getSelectors(selectCoinInfoFeature);

export const CoinInfoSelectors = {
  selectCoinInfoFeature,
  selectCoinInfos: selectEntities,
};

import { createReducer, on } from '@ngrx/store';
import { CoinInfo } from './coin-info.model';
import { environment } from 'src/environments/environment';
import { CoinInfoActions } from './coin-info.actions';

export const COIN_INFO_STORE_KEY = 'coinInfoData';
export type CoinInfoStoreType = Map<string, CoinInfo>;

export const initCoins: CoinInfoStoreType = new Map<string, CoinInfo>([
  ['EUR', { coin: 'EUR', priceInFiat: 0, imagePath: `${environment.coinImageUrl}eur.webp` }],
]);

export const coinsReducer = createReducer(
  initCoins,
  on(CoinInfoActions.updateCoinInfos, (state, { coinInfos }) => {
    const newState = { ...state };
    coinInfos.forEach((coinInfo) => newState.set(coinInfo.coin, coinInfo));
    return newState;
  }),
);

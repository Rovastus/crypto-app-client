import { createReducer, on } from '@ngrx/store';
import { CoinPairLoadingActions } from './coin-pair.actions';

export const COIN_PAIR_STORE_KEY = 'coinPairData';
export type CoinPairStoreType = {
  initBinanceCoinPairsLoading: boolean;
  importKrakenCoinPairLoading: boolean;
};

export const initCoinPairs: CoinPairStoreType = {
  initBinanceCoinPairsLoading: false,
  importKrakenCoinPairLoading: false,
};

export const coinPairsReducer = createReducer(
  initCoinPairs,
  on(CoinPairLoadingActions.setInitBinanceCoinPairsLoading, (state, { loading }) => {
    return { ...state, initBinanceCoinPairsLoading: loading };
  }),
  on(CoinPairLoadingActions.setImportKrakenCoinPairLoading, (state, { loading }) => {
    return { ...state, importKrakenCoinPairLoading: loading };
  }),
);

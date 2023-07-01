import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CoinPairPriceHistoryKrakenJsonData } from 'src/generated/graphql';
import { LoadingProp } from '../constants';

export const CoinPairLoadingActions = createActionGroup({
  source: 'CoinPair',
  events: {
    setInitBinanceCoinPairsLoading: props<LoadingProp>(),
    setImportKrakenCoinPairLoading: props<LoadingProp>(),
  },
});

export const CoinPairApiActions = createActionGroup({
  source: 'CoinPair',
  events: {
    initBinanceCoinPairs: emptyProps(),
    importKrakenCoinPair: props<{ coinPair: string; jsonData: CoinPairPriceHistoryKrakenJsonData[] }>(),
  },
});

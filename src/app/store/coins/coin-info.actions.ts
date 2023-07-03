import { createActionGroup, props } from '@ngrx/store';
import { CoinInfo } from './coin-info.model';

export const CoinInfoActions = createActionGroup({
  source: 'CoinInfo',
  events: {
    updateCoinInfos: props<{ coinInfos: Set<CoinInfo> }>(),
  },
});

export const CoinInfoApiActions = createActionGroup({
  source: 'CoinInfo API',
  events: {
    loadCoinInfos: props<{ coins: Set<string> }>(),
  },
});

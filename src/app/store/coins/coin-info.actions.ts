import { createActionGroup, props } from '@ngrx/store';
import { CoinInfoI } from './coin-info.model';

export const CoinInfoActions = createActionGroup({
  source: 'CoinInfo',
  events: {
    updateCoinInfos: props<{ coinInfos: CoinInfoI[] }>(),
  },
});

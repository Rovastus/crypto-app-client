import { createAction, props } from '@ngrx/store';
import { CoinInfo } from './coin-info.model';

export const UPDATE_COIN_INFOS = createAction('[CoinInfo] UpdateCoinInfos', props<{ coinInfos: Set<CoinInfo> }>());
export const LOAD_COIN_INFOS = createAction('[CoinInfo] LoadCoinInfos', props<{ coins: Set<string> }>());

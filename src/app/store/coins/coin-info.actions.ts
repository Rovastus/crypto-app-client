import { createAction, props } from '@ngrx/store';

export interface CoinInfo {
	coin: string;
	priceInFiat: number;
	imagePath: string;
}

export const updateCoinInfos = createAction('[CoinInfo] UpdateCoinInfos', props<{ coinInfos: Set<CoinInfo> }>());
export const loadCoinInfos = createAction('[CoinInfo] LoadCoinInfos', props<{ coins: Set<string> }>());

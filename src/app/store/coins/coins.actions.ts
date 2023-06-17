import { createAction, props } from '@ngrx/store';

export interface CoinInfo {
	coin: string;
	priceInFiat: number;
	imagePath: string;
}

export const update = createAction('[CoinInfos Component] Update', props<{ coinInfo: CoinInfo }>());

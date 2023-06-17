import { createReducer, on } from '@ngrx/store';
import { CoinInfo } from './coin-info.model';
import { environment } from 'src/environments/environment';
import { CoinInfoActions } from './coin-info.types';

export const initCoins: Map<string, CoinInfo> = new Map<string, CoinInfo>([
	['EUR', { coin: 'EUR', priceInFiat: 0, imagePath: `${environment.coinImageUrl}eur.webp` }],
]);

export const coinsReducer = createReducer(
	initCoins,
	on(CoinInfoActions.UPDATE_COIN_INFOS, (state, { coinInfos }) => {
		const newState = { ...state };
		coinInfos.forEach((coinInfo) => newState.set(coinInfo.coin, coinInfo));
		return newState;
	}),
);

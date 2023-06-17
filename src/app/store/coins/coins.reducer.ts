import { createReducer, on } from '@ngrx/store';
import { update, CoinInfo } from './coins.actions';
import { environment } from 'src/environments/environment';

export const initCoins: Map<string, CoinInfo> = new Map<string, CoinInfo>([
	['EUR', { coin: 'EUR', priceInFiat: 0, imagePath: `${environment.coinImageUrl}eur.webp` }],
]);

export const coinsReducer = createReducer(
	initCoins,
	on(update, (state, { coinInfo }) => {
		state.set(coinInfo.coin, coinInfo);
		return state;
	}),
);

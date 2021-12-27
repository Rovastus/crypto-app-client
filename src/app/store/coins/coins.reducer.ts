import { createReducer, on } from '@ngrx/store';
import { update, CoinInfo } from './coins.actions';
import { environment } from 'src/environments/environment';

export const coins: Map<string, CoinInfo> = new Map<string, CoinInfo>([
  [
    'EUR',
    {
      coin: 'EUR',
      priceInFiat: 0,
      imagePath: `${environment.coinImageUrl}eur.webp`,
    },
  ],
]);

const _coinsReduce = createReducer(
  coins,
  on(update, (state, { coinInfo }) => {
    state.set(coinInfo.coin, coinInfo);
    return state;
  })
);

export function coinsReducer(state: any, action: any) {
  return _coinsReduce(state, action);
}

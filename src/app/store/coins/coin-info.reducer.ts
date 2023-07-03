import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { CoinInfoActions } from './coin-info.actions';
import { CoinInfoI } from './coin-info.model';

export const COIN_INFO_STORE_KEY = 'coinInfoData';

export const coinInfoAdapter: EntityAdapter<CoinInfoI> = createEntityAdapter<CoinInfoI>({
  selectId: (coin) => coin.coin,
});

const initialState: EntityState<CoinInfoI> = coinInfoAdapter.getInitialState<EntityState<CoinInfoI>>({
  ids: ['EUR'],
  entities: {
    EUR: { coin: 'EUR', priceInFiat: 0, imagePath: `${environment.coinImageUrl}eur.webp` },
  },
});

export const coinsReducer = createReducer(
  initialState,
  on(CoinInfoActions.updateCoinInfos, (state, { coinInfos }) => {
    return coinInfoAdapter.addMany(coinInfos, { ...state });
  }),
);

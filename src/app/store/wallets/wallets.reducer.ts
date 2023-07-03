import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { WalletsActions, WalletsLoadingActions } from './wallets.action';
import { WalletI } from './wallets.model';

export const WALLETS_DATA_STORE_KEY = 'walletsData';

export interface WalletsState extends EntityState<WalletI> {
  portfolioId: number | undefined;
  walletsLoading: boolean;
}

export const walletsAdapter: EntityAdapter<WalletI> = createEntityAdapter<WalletI>();

const initialState: WalletsState = walletsAdapter.getInitialState({
  portfolioId: undefined,
  walletsLoading: false,
});

export const walletsDataReducer = createReducer(
  initialState,
  on(WalletsActions.setWallets, (state, { portfolioId, wallets }) => {
    return walletsAdapter.setAll(wallets, { ...state, portfolioId: portfolioId });
  }),
  on(WalletsActions.clearWallets, (state) => {
    return walletsAdapter.removeAll({ ...state, portfolioId: undefined });
  }),
  on(WalletsLoadingActions.setWalletsLoading, (state, { loading }) => {
    return { ...state, transactinLoading: loading };
  }),
);

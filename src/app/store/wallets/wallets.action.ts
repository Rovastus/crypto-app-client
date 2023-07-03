import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoadingProp } from '../constants';
import { WalletI } from './wallets.model';

export const WalletsActions = createActionGroup({
  source: 'Wallets',
  events: {
    setWallets: props<{ portfolioId: number; wallets: WalletI[] }>(),
    clearWallets: emptyProps(),
  },
});

export const WalletsLoadingActions = createActionGroup({
  source: 'Wallets Loading',
  events: {
    setWalletsLoading: props<LoadingProp>(),
  },
});

export const WalletsApiActions = createActionGroup({
  source: 'Wallets',
  events: {
    loadWallets: props<{ portfolioId: number }>(),
  },
});

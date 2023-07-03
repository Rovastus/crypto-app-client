import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { EarnsActions, EarnsLoadingActions } from './earns.action';
import { EarnI } from './earns.model';

export const EARNS_DATA_STORE_KEY = 'earnsData';

export interface EarnsState extends EntityState<EarnI> {
  portfolioId: number | undefined;
  earnsLoading: boolean;
}

export const earnsAdapter: EntityAdapter<EarnI> = createEntityAdapter<EarnI>();

const initialState: EarnsState = earnsAdapter.getInitialState({
  portfolioId: undefined,
  earnsLoading: false,
});

export const earnsDataReducer = createReducer(
  initialState,
  on(EarnsActions.setEarns, (state, { portfolioId, earns }) => {
    return earnsAdapter.setAll(earns, { ...state, portfolioId: portfolioId });
  }),
  on(EarnsActions.clearEarns, (state) => {
    return earnsAdapter.removeAll({ ...state, portfolioId: undefined });
  }),
  on(EarnsLoadingActions.setEarnsLoading, (state, { loading }) => {
    return { ...state, earnsLoading: loading };
  }),
);

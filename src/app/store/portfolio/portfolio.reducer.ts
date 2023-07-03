import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { PortfolioActions, PortfolioLoadingActions } from './portfolio.actions';
import { PortfolioI } from './portfolio.model';

export const PORTFOLIOS_DATA_STORE_KEY = 'portfoliosData';

export interface PortfoliosState extends EntityState<PortfolioI> {
  currentPortfolio: PortfolioI | undefined;
  creationPortfolioLoading: boolean;
}

export const portfoliosAdapter: EntityAdapter<PortfolioI> = createEntityAdapter<PortfolioI>();

const initialState: PortfoliosState = portfoliosAdapter.getInitialState({
  currentPortfolio: undefined,
  creationPortfolioLoading: false,
});

export const portfolioDataReducer = createReducer(
  initialState,
  on(PortfolioActions.setPortfolios, (state, { portfolios }) => {
    return portfoliosAdapter.setAll(portfolios, { ...state });
  }),
  on(PortfolioActions.addPortfolio, (state, { portfolio }) => {
    return portfoliosAdapter.addOne(portfolio, { ...state });
  }),
  on(PortfolioActions.setCurrentPortfolio, (state, { portfolio }) => {
    return { ...state, currentPortfolio: portfolio };
  }),
  on(PortfolioActions.resetCurrentPortfolio, (state) => {
    return { ...state, currentPortfolio: undefined };
  }),
  on(PortfolioLoadingActions.setCreationPortfolioLoading, (state, { loading }) => {
    return { ...state, creationPortfolioLoading: loading };
  }),
);

import { cloneDeep } from '@apollo/client/utilities/common/cloneDeep';
import { createReducer, on } from '@ngrx/store';
import { PortfolioActions, PortfolioLoadingActions } from './portfolio.actions';
import { PortfolioI, PortfolioNameI } from './portfolio.model';

export const Portfolio_DATA_STORE_KEY = 'portfolioData';
export type PortfolioDataStoreType = {
  currentPortfolioName: PortfolioNameI | undefined;
  portfolio: PortfolioI | undefined;
  portfoliosNames: PortfolioNameI[];
  creationPortfolioLoading: boolean;
};

const initPortfolioData: PortfolioDataStoreType = {
  currentPortfolioName: undefined,
  portfolio: undefined,
  portfoliosNames: [],
  creationPortfolioLoading: false,
};

export const portfolioDataReducer = createReducer(
  initPortfolioData,
  on(PortfolioActions.setCurrentPortfolioName, (state, { portfolioName }) => {
    return { ...state, currentPortfolioName: portfolioName };
  }),
  on(PortfolioActions.resetCurrentPortfolioName, (state) => {
    return { ...state, currentPortfolioName: undefined, portfolio: undefined };
  }),
  on(PortfolioActions.setPortfoliosNames, (state, { portfoliosNames }) => {
    return { ...state, portfoliosNames };
  }),
  on(PortfolioActions.addPortfoliosName, (state, { portfolioName }) => {
    const portfoliosNames = cloneDeep(state.portfoliosNames);
    portfoliosNames.push(portfolioName);
    return { ...state, portfoliosNames };
  }),
  on(PortfolioLoadingActions.setCreationPortfolioLoading, (state, { loading }) => {
    return { ...state, creationPortfolioLoading: loading };
  }),
  on(PortfolioActions.setPortfolio, (state, { portfolio }) => {
    return { ...state, portfolio };
  }),
);

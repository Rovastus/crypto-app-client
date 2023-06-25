import { createReducer, on } from '@ngrx/store';
import { PortfolioActions } from './portfolio.actions';
import { PortfolioI, PortfolioNameI } from './portfolio.model';


export const Portfolio_DATA_STORE_KEY = 'portfolioData';
export type PortfolioDataStoreType = {
  currentPortfolioName: PortfolioNameI | undefined;
  portfolio: PortfolioI | undefined;
  portfoliosNames: PortfolioNameI[];
};

const initPortfolioData: PortfolioDataStoreType = {
  currentPortfolioName: undefined,
  portfolio: undefined,
  portfoliosNames: [],
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
    return { ...state, portfoliosNames: portfoliosNames };
  }),
  on(PortfolioActions.setPortfolio, (state, { portfolio }) => {
    return { ...state, portfolio: portfolio };
  }),
);

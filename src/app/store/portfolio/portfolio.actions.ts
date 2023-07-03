import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoadingProp } from '../constants';
import { CreatePortfolioI, PortfolioI } from './portfolio.model';

export const PortfolioActions = createActionGroup({
  source: 'Portfolio',
  events: {
    setCurrentPortfolio: props<{ portfolio: PortfolioI }>(),
    resetCurrentPortfolio: emptyProps(),
    setPortfolios: props<{ portfolios: PortfolioI[] }>(),
    addPortfolio: props<{ portfolio: PortfolioI }>(),
  },
});

export const PortfolioLoadingActions = createActionGroup({
  source: 'Portfolio Loading',
  events: {
    setCreationPortfolioLoading: props<LoadingProp>(),
  },
});

export const PortfolioApiActions = createActionGroup({
  source: 'Portfolio API',
  events: {
    loadPortfolios: emptyProps(),
    createPortfolio: props<{ portfolio: CreatePortfolioI }>(),
  },
});

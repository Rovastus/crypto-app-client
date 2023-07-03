import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoadingProp } from '../constants';
import { CreatePortfolioI, PortfolioI, PortfolioNameI } from './portfolio.model';

export const PortfolioActions = createActionGroup({
  source: 'Portfolio',
  events: {
    setCurrentPortfolioName: props<{ portfolioName: PortfolioNameI }>(),
    resetCurrentPortfolioName: emptyProps(),
    setPortfoliosNames: props<{ portfoliosNames: PortfolioNameI[] }>(),
    addPortfoliosName: props<{ portfolioName: PortfolioNameI }>(),
    setPortfolio: props<{ portfolio: PortfolioI }>(),
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
    loadPortfoliosNames: emptyProps(),
    loadPortfolio: props<{ portfolioId: number }>(),
    createPortfolio: props<{ portfolio: CreatePortfolioI }>(),
  },
});

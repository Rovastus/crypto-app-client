import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PortfolioI, PortfolioNameI } from './portfolio.model';

export const PortfolioActions = createActionGroup({
  source: 'Portfolio',
  events: {
    setCurrentPortfolioName: props<{ portfolioName: PortfolioNameI }>(),
    resetCurrentPortfolioName: emptyProps(),
    setPortfoliosNames: props<{ portfoliosNames: PortfolioNameI[] }>(),
    setPortfolio: props<{ portfolio: PortfolioI }>(),
  },
});

export const PortfolioApiActions = createActionGroup({
  source: 'Portfolio API',
  events: {
    loadPortfoliosNames: emptyProps(),
    loadPortfolio: props<{ portfolioId: number }>(),
  },
});

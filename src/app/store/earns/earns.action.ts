import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoadingProp } from '../constants';
import { EarnI } from './earns.model';

export const EarnsActions = createActionGroup({
  source: 'Earns',
  events: {
    setEarns: props<{ portfolioId: number; earns: EarnI[] }>(),
    clearEarns: emptyProps(),
  },
});

export const EarnsLoadingActions = createActionGroup({
  source: 'Earns Loading',
  events: {
    setEarnsLoading: props<LoadingProp>(),
  },
});

export const EarnsApiActions = createActionGroup({
  source: 'Earns',
  events: {
    loadEarns: props<{ portfolioId: number }>(),
  },
});

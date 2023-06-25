import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PortpholioI, PortpholioNameI } from './portpholio.model';

export const PortpholioActions = createActionGroup({
  source: 'Portpholio',
  events: {
    setCurrentPortpholioName: props<{ portpholioName: PortpholioNameI }>(),
    resetCurrentPortpholioName: emptyProps(),
    setPortpholiosNames: props<{ portpholiosNames: PortpholioNameI[] }>(),
    setPortpholio: props<{ portpholio: PortpholioI }>(),
  },
});

export const PortpholioApiActions = createActionGroup({
  source: 'Portpholio API',
  events: {
    loadPortpholiosNames: emptyProps(),
    loadPortpholio: props<{ portpholioId: number }>(),
  },
});

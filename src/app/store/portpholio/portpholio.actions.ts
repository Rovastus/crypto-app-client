import { createAction, props } from '@ngrx/store';
import { PortpholioI, PortpholioNameI } from './portpholio.model';

export const SET_CURRENT_PORTPHOLIO_NAME = createAction('[Portpholio] Set current portpholio', props<{ portpholioName: PortpholioNameI }>());
export const RESET_CURRENT_PORTPHOLIO_NAME = createAction('[Portpholio] Reset current portpholio');

export const LOAD_PORTPHOLIOS_NAMES = createAction('[Portpholio] Load portpholios names');
export const SET_PORTPHOLIOS_NAMES = createAction('[Portpholio] Set portpholios names', props<{ portpholiosNames: PortpholioNameI[] }>());

export const LOAD_PORTPHOLIO = createAction('[Portpholio] Load portpholio', props<{ portpholioId: number }>());
export const SET_PORTPHOLIO = createAction('[Portpholio] Set portpholio', props<{ portpholio: PortpholioI }>());

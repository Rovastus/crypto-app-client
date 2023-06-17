import { createAction, props } from '@ngrx/store';

export const update = createAction('[Portpholio] Update', props<{ newPortpholioId: number }>());
export const reset = createAction('[Portpholio] Reset');

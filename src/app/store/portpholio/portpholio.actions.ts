import { createAction, props } from '@ngrx/store';

export const update = createAction(
  '[Portpholio Component] Update',
  props<{ newPortpholioId: number }>()
);
export const reset = createAction('[Counter Component] Reset');

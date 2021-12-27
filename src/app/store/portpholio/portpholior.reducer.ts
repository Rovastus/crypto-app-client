import { createReducer, on } from '@ngrx/store';
import { update, reset } from './portpholio.actions';

export const portpholioId = -1;

const _portpholioReduce = createReducer(
  portpholioId,
  on(update, (state, { newPortpholioId }) => newPortpholioId),
  on(reset, (state) => -1)
);

export function portpholioReducer(state: any, action: any) {
  return _portpholioReduce(state, action);
}

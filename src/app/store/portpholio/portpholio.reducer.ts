import { createReducer, on } from '@ngrx/store';
import { PortpholioActions } from './portpholio-types';

export const initPortpholioId = -1;

export const portpholioReducer = createReducer(
	initPortpholioId,
	on(PortpholioActions.update, (_state, { newPortpholioId }) => newPortpholioId),
	on(PortpholioActions.reset, (_state) => -1),
);

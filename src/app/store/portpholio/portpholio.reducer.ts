import { createReducer, on } from '@ngrx/store';
import { PortpholioActions } from './portpholio.types';
import { PortpholioI, PortpholioNameI } from './portpholio.model';

export type PortpholioDataStoreType = {
	currentPortpholioName: PortpholioNameI | undefined;
	portpholio: PortpholioI | undefined;
	portpholiosNames: PortpholioNameI[];
};

export const initPortpholioData: PortpholioDataStoreType = {
	currentPortpholioName: undefined,
	portpholio: undefined,
	portpholiosNames: [],
};

export const portpholioDataReducer = createReducer(
	initPortpholioData,
	on(PortpholioActions.SET_CURRENT_PORTPHOLIO_NAME, (state, { portpholioName }) => {
		return { ...state, currentPortpholioName: portpholioName };
	}),
	on(PortpholioActions.RESET_CURRENT_PORTPHOLIO_NAME, (state) => {
		return { ...state, currentPortpholioName: undefined, portpholio: undefined };
	}),
	on(PortpholioActions.SET_PORTPHOLIOS_NAMES, (state, { portpholiosNames }) => {
		return { ...state, portpholiosNames: portpholiosNames };
	}),
	on(PortpholioActions.SET_PORTPHOLIO, (state, { portpholio }) => {
		return { ...state, portpholio: portpholio };
	}),
);

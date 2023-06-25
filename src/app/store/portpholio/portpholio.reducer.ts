import { createReducer, on } from '@ngrx/store';
import { PortpholioI, PortpholioNameI } from './portpholio.model';
import { PortpholioActions } from './portpholio.actions';


export const PORTPHOLIO_DATA_STORE_KEY = 'portpholioData';
export type PortpholioDataStoreType = {
  currentPortpholioName: PortpholioNameI | undefined;
  portpholio: PortpholioI | undefined;
  portpholiosNames: PortpholioNameI[];
};

const initPortpholioData: PortpholioDataStoreType = {
  currentPortpholioName: undefined,
  portpholio: undefined,
  portpholiosNames: [],
};

export const portpholioDataReducer = createReducer(
  initPortpholioData,
  on(PortpholioActions.setCurrentPortpholioName, (state, { portpholioName }) => {
    return { ...state, currentPortpholioName: portpholioName };
  }),
  on(PortpholioActions.resetCurrentPortpholioName, (state) => {
    return { ...state, currentPortpholioName: undefined, portpholio: undefined };
  }),
  on(PortpholioActions.setPortpholiosNames, (state, { portpholiosNames }) => {
    return { ...state, portpholiosNames: portpholiosNames };
  }),
  on(PortpholioActions.setPortpholio, (state, { portpholio }) => {
    return { ...state, portpholio: portpholio };
  }),
);

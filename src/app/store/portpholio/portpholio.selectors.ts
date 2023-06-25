import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PORTPHOLIO_DATA_STORE_KEY, PortpholioDataStoreType } from "./portpholio.reducer";

const selectPortpholioDataFeature = createFeatureSelector<PortpholioDataStoreType>(PORTPHOLIO_DATA_STORE_KEY);

const selectCurrentPortpholioName = createSelector(
  selectPortpholioDataFeature,
  (state: PortpholioDataStoreType) => state.currentPortpholioName
);

const selectPortpholio = createSelector(
  selectPortpholioDataFeature,
  (state: PortpholioDataStoreType) => state.portpholio
);

const selectPortpholiosNames = createSelector(
  selectPortpholioDataFeature,
  (state: PortpholioDataStoreType) => state.portpholiosNames
);

export const PortpholioSelectors = {
  selectPortpholioDataFeature,
  selectCurrentPortpholioName,
  selectPortpholio,
  selectPortpholiosNames
}

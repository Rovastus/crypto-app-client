import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FILE_DATA_STORE_KEY, FileDataStoreType } from './files.reducer';

const selectFileDataFeature = createFeatureSelector<FileDataStoreType>(FILE_DATA_STORE_KEY);

const selectFiles = createSelector(selectFileDataFeature, (state: FileDataStoreType) => state.files);

const selectCreationFileLoading = createSelector(selectFileDataFeature, (state: FileDataStoreType) => state.creationFileLoading);

export const PortfolioSelectors = {
  selectFileDataFeature,
  selectFiles,
  selectCreationFileLoading,
};

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FILE_DATA_STORE_KEY, FileDataStoreType } from './files.reducer';

const selectFileDataFeature = createFeatureSelector<FileDataStoreType>(FILE_DATA_STORE_KEY);

const selectFiles = createSelector(selectFileDataFeature, (state: FileDataStoreType) => state.files);
const selectPortfolioId = createSelector(selectFileDataFeature, (state: FileDataStoreType) => state.portfolioId);

const selectCreationFileLoading = createSelector(selectFileDataFeature, (state: FileDataStoreType) => state.creationFileLoading);
const selectFileLoading = createSelector(selectFileDataFeature, (state: FileDataStoreType) => state.filesLoading);

export const FilesSelectors = {
  selectFileDataFeature,
  selectFiles,
  selectPortfolioId,
  selectCreationFileLoading,
  selectFileLoading,
};

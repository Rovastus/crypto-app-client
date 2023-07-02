import { cloneDeep } from '@apollo/client/utilities';
import { createReducer, on } from '@ngrx/store';
import { FilesActions, FilesLoadingActions } from './files.actions';
import { FileI } from './files.model';

export const FILE_DATA_STORE_KEY = 'fileData';
export type FileDataStoreType = {
  portfolioId: undefined | number;
  files: FileI[];
  filesLoading: boolean;
  creationFileLoading: boolean;
};

const initFileData: FileDataStoreType = {
  portfolioId: undefined,
  files: [],
  filesLoading: false,
  creationFileLoading: false,
};

export const fileDataReducer = createReducer(
  initFileData,
  on(FilesActions.setFiles, (state, { portfolioId, files }) => {
    return { ...state, files: files, portfolioId: portfolioId };
  }),
  on(FilesActions.addFile, (state, { file }) => {
    const files = cloneDeep(state.files);
    files.push(file);
    return { ...state, files: files };
  }),
  on(FilesActions.resetFiles, (state) => {
    return { ...state, files: [], portfolioId: undefined };
  }),
  on(FilesLoadingActions.setFilesLoading, (state, { loading }) => {
    return { ...state, filesLoading: loading };
  }),
  on(FilesLoadingActions.setCreationFileLoading, (state, { loading }) => {
    return { ...state, creationFileLoading: loading };
  }),
);

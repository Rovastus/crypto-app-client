import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoadingProp } from '../constants';
import { CreateFileI, FileI } from './files.model';

export const FilesActions = createActionGroup({
  source: 'Files',
  events: {
    setFiles: props<{ portfolioId: number; files: FileI[] }>(),
    addFile: props<{ file: FileI }>(),
    resetFiles: emptyProps(),
  },
});

export const FilesLoadingActions = createActionGroup({
  source: 'Files Loading',
  events: {
    setFilesLoading: props<LoadingProp>(),
    setCreationFileLoading: props<LoadingProp>(),
  },
});

export const FilesApiActions = createActionGroup({
  source: 'Files API',
  events: {
    loadFiles: props<{ portfolioId: number }>(),
    createFile: props<{ createFile: CreateFileI }>(),
  },
});

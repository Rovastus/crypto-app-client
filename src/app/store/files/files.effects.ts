import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, finalize, map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { FilesService } from 'src/app/service/files/files.service';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { LOADING_FALSE, LOADING_TRUE } from '../constants';
import { FilesActions, FilesApiActions, FilesLoadingActions } from './files.actions';

@Injectable()
export class FilesEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly filesService = inject(FilesService);
  private readonly snackBarService = inject(SnackBarService);

  loadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesApiActions.loadFiles),
      tap(() => this.store.dispatch(FilesLoadingActions.setFilesLoading(LOADING_TRUE))),
      mergeMap(({ portfolioId }) => {
        return this.filesService.getFilesByPortfolioId(portfolioId).pipe(
          finalize(() => this.store.dispatch(FilesLoadingActions.setFilesLoading(LOADING_FALSE))),
          takeUntil(this.actions$.pipe(ofType(FilesApiActions.loadFiles))),
          catchError(() => {
            this.snackBarService.displayError('Error while loading files');
            return EMPTY;
          }),
          map((files) => FilesActions.setFiles({ files })),
        );
      }),
    ),
  );

  createFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesApiActions.createFile),
      tap(() => this.store.dispatch(FilesLoadingActions.setCreationFileLoading(LOADING_TRUE))),
      mergeMap(({ createFile }) => {
        return this.filesService.createFile(createFile).pipe(
          finalize(() => this.store.dispatch(FilesLoadingActions.setCreationFileLoading(LOADING_FALSE))),
          catchError(() => {
            this.snackBarService.displayError('Error while importing file');
            return EMPTY;
          }),
          map((file) => {
            this.snackBarService.displayInfo('File imported.');
            return FilesActions.addFile({ file });
          }),
        );
      }),
    ),
  );
}

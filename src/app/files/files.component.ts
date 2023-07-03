import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EMPTY, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FilesApiActions } from '../store/files/files.actions';
import { FilesSelectors } from '../store/files/files.selectors';
import { PortfolioSelectors } from '../store/portfolio/portfolio.selectors';
import { FilesDialogComponent } from './dialog/files-dialog.component';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent {
  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);

  files$ = combineLatest([this.store.select(PortfolioSelectors.selectCurrentPortfolioName), this.store.select(FilesSelectors.selectPortfolioId)]).pipe(
    switchMap((response) => {
      const portfolioId = response[0]?.id;
      const filesPortfolioId = response[1];

      if (!portfolioId) return EMPTY;

      if (filesPortfolioId !== portfolioId) {
        this.store.dispatch(FilesApiActions.loadFiles({ portfolioId: portfolioId }));
      }

      return this.store.select(FilesSelectors.selectFiles);
    }),
  );

  loading$ = this.store.select(FilesSelectors.selectFileLoading);

  displayedColumns: string[] = ['id', 'name'];

  openDialog(): void {
    this.dialog.open(FilesDialogComponent, { width: '500px' });
  }
}

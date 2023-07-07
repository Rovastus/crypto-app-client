import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, effect, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { asapScheduler } from 'rxjs';
import { AppNgxDatatable } from '../shared/ngx-datatable/app-ngx-datatable.component';
import { AppTableColumn, AppTableColumnSettings } from '../shared/ngx-datatable/app-ngx-datatable.model';
import { FilesApiActions } from '../store/files/files.actions';
import { FilesSelectors } from '../store/files/files.selectors';
import { PortfolioSelectors } from '../store/portfolio/portfolio.selectors';
import { FilesDialogComponent } from './dialog/files-dialog.component';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesComponent extends AppNgxDatatable implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);

  portfolio = this.store.selectSignal(PortfolioSelectors.selectCurrentPortfolio);
  portfolioChangedEffect = effect(() => {
    const portfolioId = this.portfolio()?.id;
    if (portfolioId) {
      asapScheduler.schedule(() => this.store.dispatch(FilesApiActions.loadFiles({ portfolioId: portfolioId })));
    }
  });

  files = this.store.selectSignal(FilesSelectors.selectFiles);
  loadingIndicator = this.store.selectSignal(FilesSelectors.selectFileLoading);

  cols: WritableSignal<AppTableColumn[]> = signal([]);

  ngOnInit(): void {
    const columnsSettings: AppTableColumnSettings = new Map([
      ['Id', { prop: 'id' }],
      ['Name', { prop: 'name' }],
    ]);
    this.cols.set(this.createColumns(columnsSettings, undefined));
  }

  openDialog(): void {
    this.dialog.open(FilesDialogComponent, { width: '500px' });
  }
}

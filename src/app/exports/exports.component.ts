import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExportsByPortpholioIdGQL } from 'src/generated/graphql';
import { ExportsDialogComponent } from './dialog/exports-dialog.component';

@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.css'],
})
export class ExportsComponent implements OnInit {
  dataString!: string | null;
  portpholioId$: Observable<number>;
  exports$!: Observable<any>;
  displayedColumns: string[] = ['id', 'name'];

  constructor(
    private dialog: MatDialog,
    private getExportsByPortpholioIdGQL: ExportsByPortpholioIdGQL,
    private store: Store<{ portpholioId: number }>
  ) {
    this.portpholioId$ = this.store.select('portpholioId');
  }

  ngOnInit(): void {
    this.portpholioId$.subscribe((portpholioId) => {
      if (portpholioId != -1) {
        this.exports$ = this.getExportsByPortpholioIdGQL
          .watch({
            portpholioId: portpholioId,
          })
          .valueChanges.pipe(
            map((result) => result.data.exportsByPortpholioId)
          );
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ExportsDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((update: boolean) => {
      console.log('The dialog was closed');
    });
  }
}

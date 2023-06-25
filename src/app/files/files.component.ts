import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilesByPortfolioIdGQL } from 'src/generated/graphql';
import { FilesDialogComponent } from './dialog/files-dialog.component';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
})
export class FilesComponent implements OnInit {
  dataString!: string | null;
  portfolioId$: Observable<number>;
  exports$!: Observable<any>;
  displayedColumns: string[] = ['id', 'name'];

  constructor(private dialog: MatDialog, private getFilesByPortfolioIdGQL: FilesByPortfolioIdGQL, private store: Store<{ portfolioId: number }>) {
    this.portfolioId$ = this.store.select('portfolioId');
  }

  ngOnInit(): void {
    this.portfolioId$.subscribe((portfolioId) => {
      if (portfolioId !== -1) {
        this.exports$ = this.getFilesByPortfolioIdGQL
          .watch({
            portfolioId,
          })
          .valueChanges.pipe(map((result: any) => result.data.exportsByPortfolioId));
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FilesDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((update: boolean) => {
      console.log('The dialog was closed');
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PortpholioDialogComponent } from './dialog/portpholio-dialog.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PortpholioNameI } from '../store/portpholio/portpholio.model';
import { PortpholioActions, PortpholioApiActions } from '../store/portpholio/portpholio.actions';
import { PortpholioSelectors } from '../store/portpholio/portpholio.selectors';

@Component({
  selector: 'app-portpholio',
  templateUrl: './portpholio.component.html',
  styleUrls: ['./portpholio.component.css'],
})
export class PortpholioComponent implements OnInit {
  portpholios$!: Observable<PortpholioNameI[]>;

  constructor(private dialog: MatDialog, private readonly store: Store) { }

  ngOnInit(): void {
    this.portpholios$ = this.store.select(PortpholioSelectors.selectPortpholiosNames);
    this.store.dispatch(PortpholioApiActions.loadPortpholiosNames());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PortpholioDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((shouldUpdate: boolean) => {
      if (shouldUpdate) {
        this.store.dispatch(PortpholioApiActions.loadPortpholiosNames());
      }
    });
  }

  portpholioSelected(portpholioName: PortpholioNameI): void {
    this.store.dispatch(PortpholioActions.setCurrentPortpholioName({ portpholioName }));
  }
}

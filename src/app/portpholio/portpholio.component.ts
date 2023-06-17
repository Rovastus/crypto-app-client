import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PortpholioDialogComponent } from './dialog/portpholio-dialog.component';
import { AllPortpholiosGQL } from 'src/generated/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { PortpholioNameI } from '../store/portpholio/portpholio.model';
import { PortpholioActions } from '../store/portpholio/portpholio.types';
import { PortpholioDataStoreType } from '../store/portpholio/portpholio.reducer';

@Component({
	selector: 'app-portpholio',
	templateUrl: './portpholio.component.html',
	styleUrls: ['./portpholio.component.css'],
})
export class PortpholioComponent implements OnInit {
	portpholios$!: Observable<PortpholioNameI[]>;

	constructor(private dialog: MatDialog, private readonly store: Store<{ portpholioData: PortpholioDataStoreType }>) {}

	ngOnInit(): void {
		this.portpholios$ = this.store.select('portpholioData').pipe(map((portpholioData) => portpholioData.portpholiosNames));
		this.store.dispatch(PortpholioActions.LOAD_PORTPHOLIOS_NAMES());
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(PortpholioDialogComponent, {
			width: '400px',
		});

		dialogRef.afterClosed().subscribe((shouldUpdate: boolean) => {
			if (shouldUpdate) {
				this.store.dispatch(PortpholioActions.LOAD_PORTPHOLIOS_NAMES());
			}
		});
	}

	portpholioSelected(portpholioName: PortpholioNameI): void {
		this.store.dispatch(PortpholioActions.SET_CURRENT_PORTPHOLIO_NAME({ portpholioName }));
	}
}

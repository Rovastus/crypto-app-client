import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PortpholioDialogComponent } from './dialog/portpholio-dialog.component';
import { AllPortpholiosGQL } from 'src/generated/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { update } from '../store/portpholio/portpholio.actions';

interface Portpholio {
	id: number;
	name: string;
}

@Component({
	selector: 'app-portpholio',
	templateUrl: './portpholio.component.html',
	styleUrls: ['./portpholio.component.css'],
})
export class PortpholioComponent implements OnInit {
	portpholios$!: Observable<Portpholio[]>;

	constructor(private dialog: MatDialog, private allPortpholiosGQL: AllPortpholiosGQL, private store: Store<{ portpholioId: number }>) {}

	ngOnInit(): void {
		this.portpholios$ = this.allPortpholiosGQL.watch().valueChanges.pipe(map((result) => result.data.allPortpholios));
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(PortpholioDialogComponent, {
			width: '400px',
		});

		dialogRef.afterClosed().subscribe((shouldUpdate: boolean) => {
			if (shouldUpdate) {
				this.allPortpholiosGQL.watch().refetch();
			}
		});
	}

	portpholioSelected(newPortpholioId: number): void {
		this.store.dispatch(update({ newPortpholioId }));
	}
}

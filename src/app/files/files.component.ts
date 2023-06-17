import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilesByPortpholioIdGQL } from 'src/generated/graphql';
import { FilesDialogComponent } from './dialog/files-dialog.component';

@Component({
	selector: 'app-files',
	templateUrl: './files.component.html',
	styleUrls: ['./files.component.css'],
})
export class FilesComponent implements OnInit {
	dataString!: string | null;
	portpholioId$: Observable<number>;
	exports$!: Observable<any>;
	displayedColumns: string[] = ['id', 'name'];

	constructor(private dialog: MatDialog, private getFilesByPortpholioIdGQL: FilesByPortpholioIdGQL, private store: Store<{ portpholioId: number }>) {
		this.portpholioId$ = this.store.select('portpholioId');
	}

	ngOnInit(): void {
		this.portpholioId$.subscribe((portpholioId) => {
			if (portpholioId !== -1) {
				this.exports$ = this.getFilesByPortpholioIdGQL
					.watch({
						portpholioId,
					})
					.valueChanges.pipe(map((result: any) => result.data.exportsByPortpholioId));
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { FilesComponent } from './files.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FilesDialogComponent } from './dialog/files-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ShareModule } from '../common/share.module';

@NgModule({
	declarations: [FilesComponent, FilesDialogComponent],
	imports: [
		CommonModule,
		ShareModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatTableModule,
		MatIconModule,
		MatProgressSpinnerModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		FilesRoutingModule,
	],
})
export class FilesModule {}

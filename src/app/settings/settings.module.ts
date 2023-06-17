import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { KrakenDialogComponent } from './dialog/kraken-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ShareModule } from '../common/share.module';

@NgModule({
	declarations: [SettingsComponent, KrakenDialogComponent],
	imports: [
		CommonModule,
		ShareModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatDialogModule,
		MatProgressSpinnerModule,
		MatButtonModule,
		SettingsRoutingModule,
	],
})
export class SettingsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

@NgModule({
	declarations: [InfoComponent],
	imports: [CommonModule, MatListModule, MatTableModule, InfoRoutingModule],
})
export class InfoModule {}

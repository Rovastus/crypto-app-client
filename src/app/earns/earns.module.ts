import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EarnsRoutingModule } from './earns-routing.module';
import { EarnsComponent } from './earns.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
	declarations: [EarnsComponent],
	imports: [CommonModule, MatTableModule, EarnsRoutingModule],
})
export class EarnsModule {}

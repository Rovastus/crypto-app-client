import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { EarnsRoutingModule } from './earns-routing.module';
import { EarnsComponent } from './earns.component';

@NgModule({
  declarations: [EarnsComponent],
  imports: [CommonModule, MatTableModule, EarnsRoutingModule],
})
export class EarnsModule { }

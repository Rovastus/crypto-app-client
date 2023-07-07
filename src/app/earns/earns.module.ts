import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EarnsRoutingModule } from './earns-routing.module';
import { EarnsComponent } from './earns.component';

@NgModule({
  declarations: [EarnsComponent],
  imports: [CommonModule, NgxDatatableModule, EarnsRoutingModule],
})
export class EarnsModule {}

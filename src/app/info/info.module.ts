import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';

@NgModule({
  declarations: [InfoComponent],
  imports: [CommonModule, MatListModule, MatTableModule, NgxDatatableModule, InfoRoutingModule],
})
export class InfoModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { MatTableModule } from '@angular/material/table';
import { TransactionsComponent } from './transactions.component';

@NgModule({
	declarations: [TransactionsComponent],
	imports: [CommonModule, MatTableModule, TransactionsRoutingModule],
})
export class TransactionsModule {}

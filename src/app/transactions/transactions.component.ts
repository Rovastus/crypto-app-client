import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransactionsByPortpholioIdGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  portpholioId$: Observable<number>;
  transactions$!: Observable<any>;
  displayedColumns: string[] = [
    'id',
    'time',
    'buy',
    'price',
    'fee',
    'transactionTaxEvents',
  ];

  constructor(
    private getTransactionsByPortpholioIdGQL: TransactionsByPortpholioIdGQL,
    private store: Store<{ portpholioId: number }>
  ) {
    this.portpholioId$ = this.store.select('portpholioId');
  }

  ngOnInit(): void {
    this.portpholioId$.subscribe((portpholioId) => {
      if (portpholioId != -1) {
        this.transactions$ = this.getTransactionsByPortpholioIdGQL
          .watch({
            portpholioId: portpholioId,
          })
          .valueChanges.pipe(
            map((result) => result.data.transactionsByPortpholioId)
          );
      }
    });
  }
}

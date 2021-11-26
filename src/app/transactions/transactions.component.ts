import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Fiat,
  TransactionsByPortpholioIdGQL,
  TransactionTaxEventType,
} from 'src/generated/graphql';

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
    'feeGain',
    'feeExpenses',
    'tradeGain',
    'tradeExpenses',
  ];
  TaxEventType = TransactionTaxEventType;

  constructor(
    private getTransactionsByPortpholioIdGQL: TransactionsByPortpholioIdGQL,
    private store: Store<{ portpholioId: number }>
  ) {
    this.portpholioId$ = this.store.select('portpholioId');
  }

  ngOnInit(): void {
    this.portpholioId$.subscribe((portpholioId) => {
      if (portpholioId !== -1) {
        this.transactions$ = this.getTransactionsByPortpholioIdGQL
          .watch({
            portpholioId,
          })
          .valueChanges.pipe(
            map((result) => result.data.transactionsByPortpholioId)
          );
      }
    });
  }

  getGain(
    transactionTaxEvents: { type: TransactionTaxEventType; gainInFiat: any }[],
    type: TransactionTaxEventType
  ): string {
    const transactionTaxEvent = transactionTaxEvents.find(
      (element) => element.type === type
    );
    return transactionTaxEvent
      ? transactionTaxEvent.gainInFiat + ' ' + Fiat.Eur
      : '-';
  }

  getExpenses(
    transactionTaxEvents: {
      type: TransactionTaxEventType;
      expensesInFiat: any;
    }[],
    type: TransactionTaxEventType
  ): string {
    const transactionTaxEvent = transactionTaxEvents.find(
      (element) => element.type === type
    );
    return transactionTaxEvent
      ? transactionTaxEvent.expensesInFiat + ' ' + Fiat.Eur
      : '-';
  }
}

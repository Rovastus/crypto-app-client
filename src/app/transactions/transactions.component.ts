import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransactionTaxEventTypeEnum, TransactionsByPortfolioIdGQL } from 'src/generated/graphql';
import { CoinInfo } from '../store/coins/coin-info.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  portfolioId$: Observable<number>;
  coins$: Observable<Map<string, CoinInfo>>;
  transactions$!: Observable<any>;
  displayedColumns: string[] = ['id', 'time', 'buy', 'price', 'fee', 'feeGain', 'feeExpenses', 'tradeGain', 'tradeExpenses', 'earnLose'];
  TaxEventType = TransactionTaxEventTypeEnum;

  constructor(
    private getTransactionsByPortfolioIdGQL: TransactionsByPortfolioIdGQL,
    private store: Store<{
      portfolioId: number;
      coins: Map<string, CoinInfo>;
    }>,
  ) {
    this.portfolioId$ = this.store.select('portfolioId');
    this.coins$ = this.store.select('coins');
  }

  ngOnInit(): void {
    this.portfolioId$.subscribe((portfolioId) => {
      if (portfolioId !== -1) {
        this.transactions$ = this.getTransactionsByPortfolioIdGQL
          .watch({
            portfolioId,
          })
          .valueChanges.pipe(map((result) => result.data.transactionsByPortfolioId));
      }
    });
  }

  getGain(transactionTaxEvents: { type: TransactionTaxEventTypeEnum; gainInFiat: any }[], type: TransactionTaxEventTypeEnum): string {
    const transactionTaxEvent = transactionTaxEvents.find((element) => element.type === type);
    return transactionTaxEvent ? transactionTaxEvent.gainInFiat : '-';
  }

  getExpenses(
    transactionTaxEvents: {
      type: TransactionTaxEventTypeEnum;
      expensesInFiat: any;
    }[],
    type: TransactionTaxEventTypeEnum,
  ): string {
    const transactionTaxEvent = transactionTaxEvents.find((element) => element.type === type);
    return transactionTaxEvent ? transactionTaxEvent.expensesInFiat : '-';
  }

  getEarnLose(
    transactionTaxEvents: {
      gainInFiat: string;
      expensesInFiat: string;
    }[],
  ): string {
    if (transactionTaxEvents.length === 0) {
      return '-';
    }

    let gainInFiatTotal = 0;
    let expensesInFiatTotal = 0;
    transactionTaxEvents.forEach((transactionTaxEvent) => {
      gainInFiatTotal += parseFloat(transactionTaxEvent.gainInFiat);
      expensesInFiatTotal += parseFloat(transactionTaxEvent.expensesInFiat);
    });

    const earnLose = gainInFiatTotal - expensesInFiatTotal;
    return earnLose.toFixed(8);
  }

  getTotalEarnLose(
    transactions: {
      transactionTaxEvent: {
        gainInFiat: string;
        expensesInFiat: string;
      }[];
    }[],
  ): number {
    if (transactions !== null) {
      return transactions.reduce((acc, value) => {
        let gainInFiatTotal = 0;
        let expensesInFiatTotal = 0;
        value.transactionTaxEvent.forEach((transactionTaxEvent) => {
          gainInFiatTotal += parseFloat(transactionTaxEvent.gainInFiat);
          expensesInFiatTotal += parseFloat(transactionTaxEvent.expensesInFiat);
        });

        const earnLose = gainInFiatTotal - expensesInFiatTotal;
        return acc + earnLose;
      }, 0);
    }

    return 0;
  }
}

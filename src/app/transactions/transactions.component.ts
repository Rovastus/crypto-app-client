import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import Decimal from 'decimal.js';
import { EMPTY, Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FiatEnum, TransactionTaxEventTypeEnum } from 'src/generated/graphql';
import { CoinInfoStoreType } from '../store/coins/coin-info.reducer';
import { CoinInfoSelectors } from '../store/coins/coin-info.selectors';
import { PortfolioSelectors } from '../store/portfolio/portfolio.selectors';
import { TransactionsApiActions } from '../store/transactions/transactions.action';
import { TransactionI, TransactionTaxEventI } from '../store/transactions/transactions.model';
import { TransactionsSelectors } from '../store/transactions/transactions.selectors';
import { TransactionTableRowI, TransactionsTableDataI } from './transactions.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  private readonly store = inject(Store);

  private transactions$ = combineLatest([
    this.store.select(PortfolioSelectors.selectCurrentPortfolioName),
    this.store.select(TransactionsSelectors.selectPortfolioId),
  ]).pipe(
    switchMap((data) => {
      const portfolioId = data[0]?.id;
      const currentPortfolioId = data[1];

      if (!portfolioId) return EMPTY;

      if (currentPortfolioId !== portfolioId) {
        this.store.dispatch(TransactionsApiActions.loadTransactions({ portfolioId }));
      }

      return this.store.select(TransactionsSelectors.selectTransactions);
    }),
  );
  private coins$ = this.store.select(CoinInfoSelectors.selectCoinInfoFeature);

  tableData$: Observable<TransactionsTableDataI> = combineLatest([this.transactions$, this.coins$]).pipe(map((data) => this.mapTransactionsTableData(data)));

  displayedColumns: string[] = ['id', 'time', 'buy', 'price', 'fee', 'feeGain', 'feeExpenses', 'tradeGain', 'tradeExpenses', 'earnOrLose'];
  readonly TaxEventType = TransactionTaxEventTypeEnum;

  private mapTransactionsTableData(data: [TransactionI[] | undefined, CoinInfoStoreType]): TransactionsTableDataI {
    const transactions = data[0];
    const coins = data[1];

    if (!transactions || !coins) {
      return {
        rows: [],
        totalEarnOrLose: '-',
        fiat: '',
        fiatImagePath: '',
      };
    }

    const rows = transactions.map<TransactionTableRowI>((transaction) => this.mapTransactionToTransactionTableRow(transaction, coins));
    const fiatImagePath = coins.get(FiatEnum.Eur)?.imagePath;

    return {
      rows,
      totalEarnOrLose: this.getTotalEarnOrLose(rows),
      fiat: FiatEnum.Eur,
      fiatImagePath: fiatImagePath ? fiatImagePath : '',
    };
  }

  private mapTransactionToTransactionTableRow(transaction: TransactionI, coins: CoinInfoStoreType): TransactionTableRowI {
    const buyCoinImagePath = coins.get(transaction.buyCoin)?.imagePath;
    const priceCoinImagePath = coins.get(transaction.priceCoin)?.imagePath;
    const feeCoinImagePath = coins.get(transaction.feeCoin)?.imagePath;

    return {
      id: transaction.id,
      time: transaction.time,
      buy: transaction.buy,
      buyCoinImagePath: buyCoinImagePath ? buyCoinImagePath : '',
      price: transaction.price,
      priceCoinImagePath: priceCoinImagePath ? priceCoinImagePath : '',
      fee: transaction.fee,
      feeCoinImagePath: feeCoinImagePath ? feeCoinImagePath : '',
      feeGain: this.getGain(transaction.transactionTaxEvents, TransactionTaxEventTypeEnum.Fee),
      feeExpenses: this.getExpenses(transaction.transactionTaxEvents, TransactionTaxEventTypeEnum.Fee),
      tradeGain: this.getGain(transaction.transactionTaxEvents, TransactionTaxEventTypeEnum.Buy),
      tradeExpenses: this.getExpenses(transaction.transactionTaxEvents, TransactionTaxEventTypeEnum.Buy),
      earnOrLose: this.getEarnOrLose(transaction.transactionTaxEvents),
    };
  }

  private getGain(transactionTaxEvents: TransactionTaxEventI[], type: TransactionTaxEventTypeEnum): string {
    const transactionTaxEvent = transactionTaxEvents.find((element) => element.type === type);
    return transactionTaxEvent ? transactionTaxEvent.gainInFiat : '-';
  }

  private getExpenses(transactionTaxEvents: TransactionTaxEventI[], type: TransactionTaxEventTypeEnum): string {
    const transactionTaxEvent = transactionTaxEvents.find((element) => element.type === type);
    return transactionTaxEvent ? transactionTaxEvent.expensesInFiat : '-';
  }

  private getEarnOrLose(transactionTaxEvents: TransactionTaxEventI[]): string {
    if (transactionTaxEvents.length === 0) {
      return '-';
    }

    let gainInFiatTotal = new Decimal(0);
    let expensesInFiatTotal = new Decimal(0);
    transactionTaxEvents.forEach((transactionTaxEvent) => {
      gainInFiatTotal = gainInFiatTotal.plus(new Decimal(transactionTaxEvent.gainInFiat));
      expensesInFiatTotal = expensesInFiatTotal.plus(new Decimal(transactionTaxEvent.expensesInFiat));
    });

    return gainInFiatTotal.minus(expensesInFiatTotal).toFixed(8);
  }

  private getTotalEarnOrLose(rows: TransactionTableRowI[]): string {
    if (rows.length === 0) {
      return '-';
    }

    let totalEarnOrLose = new Decimal(0);
    rows.forEach((row) => {
      if (row.earnOrLose !== '-') {
        totalEarnOrLose = totalEarnOrLose.plus(new Decimal(row.earnOrLose));
      }
    });

    return totalEarnOrLose.toFixed(8);
  }
}

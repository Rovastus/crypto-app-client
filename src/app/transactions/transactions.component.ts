import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, WritableSignal, computed, inject, signal } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import Decimal from 'decimal.js';
import { FiatEnum, TransactionTaxEventTypeEnum } from 'src/generated/graphql';
import { AppNgxDatatable } from '../shared/ngx-datatable/app-ngx-datatable.component';
import { AppTableColumn, AppTableColumnSettings } from '../shared/ngx-datatable/app-ngx-datatable.model';
import { CoinInfoI } from '../store/coins/coin-info.model';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent extends AppNgxDatatable implements OnInit {
  private readonly store = inject(Store);

  @ViewChild('dateTmpl', { static: true }) private dateTmpl!: TemplateRef<unknown>;
  @ViewChild('coinWithValueTmpl', { static: true }) private coinWithValueTmpl!: TemplateRef<unknown>;
  @ViewChild('fiatWithValueTmpl', { static: true }) private fiatWithValueTmpl!: TemplateRef<unknown>;
  @ViewChild('fiatWithValueWithColorTmpl', { static: true }) private fiatWithValueWithColorTmpl!: TemplateRef<unknown>;
  cols: WritableSignal<AppTableColumn[]> = signal([]);

  portfolio = this.store.selectSignal(PortfolioSelectors.selectCurrentPortfolio);
  private transactions = this.store.selectSignal(TransactionsSelectors.selectTransactions);
  private coins = this.store.selectSignal(CoinInfoSelectors.selectCoinInfos);
  tableData = computed(() => {
    return this.mapTransactionsTableData(this.transactions(), this.coins());
  });

  loading = this.store.selectSignal(TransactionsSelectors.selectTransactionsLoading);

  ngOnInit(): void {
    const columnsSettings: AppTableColumnSettings = new Map([
      ['Time', { cellTemplate: this.dateTmpl, prop: 'time' }],
      ['Buy', { cellTemplate: this.coinWithValueTmpl, prop: 'buy', extraData: { coin: 'buyCoinImagePath', coinImagePath: 'buyCoinImagePath' } }],
      ['Price', { cellTemplate: this.coinWithValueTmpl, prop: 'price', extraData: { coin: 'priceCoin', coinImagePath: 'priceCoinImagePath' } }],
      ['Fee', { cellTemplate: this.coinWithValueTmpl, prop: 'fee', extraData: { coin: 'feeCoin', coinImagePath: 'feeCoinImagePath' } }],
      ['feeGain', { cellTemplate: this.fiatWithValueTmpl, prop: 'feeGain' }],
      ['feeExpenses', { cellTemplate: this.fiatWithValueTmpl, prop: 'feeExpenses' }],
      ['tradeGain', { cellTemplate: this.fiatWithValueTmpl, prop: 'tradeGain' }],
      ['tradeExpenses', { cellTemplate: this.fiatWithValueTmpl, prop: 'tradeExpenses' }],
      ['earnOrLose', { cellTemplate: this.fiatWithValueWithColorTmpl, prop: 'earnOrLose' }],
    ]);
    this.cols.set(this.createColumns(columnsSettings, undefined));
    this.loadTransactions();
  }

  private loadTransactions(): void {
    const portfolioId = this.portfolio()?.id;
    if (!portfolioId) return;

    this.store.dispatch(TransactionsApiActions.loadTransactions({ portfolioId }));
  }

  private mapTransactionsTableData(transactions: TransactionI[] | undefined, coins: Dictionary<CoinInfoI>): TransactionsTableDataI {
    if (!transactions || !coins) {
      return {
        rows: [],
        totalFeeGains: '',
        totalFeeExpenses: '',
        totalTradeGains: '',
        totalTradeExpenses: '',
        totalEarnOrLose: '',
        fiat: '',
        fiatImagePath: '',
      };
    }

    const rows = transactions.map<TransactionTableRowI>((transaction) => this.mapTransactionToTransactionTableRow(transaction, coins));
    const fiatImagePath = coins[FiatEnum.Eur]?.imagePath;

    return {
      rows,
      totalFeeGains: this.getTotalFeeGains(rows),
      totalFeeExpenses: this.getTotalFeeExpenses(rows),
      totalTradeGains: this.getTotalTradeGains(rows),
      totalTradeExpenses: this.getTotalTradeExpenses(rows),
      totalEarnOrLose: this.getTotalEarnOrLose(rows),
      fiat: FiatEnum.Eur,
      fiatImagePath: fiatImagePath ?? '',
    };
  }

  private mapTransactionToTransactionTableRow(transaction: TransactionI, coins: Dictionary<CoinInfoI>): TransactionTableRowI {
    const buyCoinImagePath = coins[transaction.buyCoin]?.imagePath;
    const priceCoinImagePath = coins[transaction.priceCoin]?.imagePath;
    const feeCoinImagePath = coins[transaction.feeCoin]?.imagePath;

    return {
      id: transaction.id,
      time: transaction.time,
      buy: transaction.buy,
      buyCoin: transaction.buyCoin,
      buyCoinImagePath: buyCoinImagePath ?? '',
      price: transaction.price,
      priceCoin: transaction.priceCoin,
      priceCoinImagePath: priceCoinImagePath ?? '',
      fee: transaction.fee,
      feeCoin: transaction.feeCoin,
      feeCoinImagePath: feeCoinImagePath ?? '',
      feeGain: this.getGain(transaction.transactionTaxEvents, TransactionTaxEventTypeEnum.Fee),
      feeExpenses: this.getExpenses(transaction.transactionTaxEvents, TransactionTaxEventTypeEnum.Fee),
      tradeGain: this.getGain(transaction.transactionTaxEvents, TransactionTaxEventTypeEnum.Buy),
      tradeExpenses: this.getExpenses(transaction.transactionTaxEvents, TransactionTaxEventTypeEnum.Buy),
      earnOrLose: this.getEarnOrLose(transaction.transactionTaxEvents),
    };
  }

  private getGain(transactionTaxEvents: TransactionTaxEventI[], type: TransactionTaxEventTypeEnum): string {
    const transactionTaxEvent = transactionTaxEvents.find((element) => element.type === type);
    return transactionTaxEvent?.gainInFiat ?? '';
  }

  private getExpenses(transactionTaxEvents: TransactionTaxEventI[], type: TransactionTaxEventTypeEnum): string {
    const transactionTaxEvent = transactionTaxEvents.find((element) => element.type === type);
    return transactionTaxEvent?.expensesInFiat ?? '';
  }

  private getEarnOrLose(transactionTaxEvents: TransactionTaxEventI[]): string {
    if (transactionTaxEvents.length === 0) {
      return '';
    }

    let gainInFiatTotal = new Decimal(0);
    let expensesInFiatTotal = new Decimal(0);
    transactionTaxEvents.forEach((transactionTaxEvent) => {
      gainInFiatTotal = gainInFiatTotal.plus(new Decimal(transactionTaxEvent.gainInFiat));
      expensesInFiatTotal = expensesInFiatTotal.plus(new Decimal(transactionTaxEvent.expensesInFiat));
    });

    return gainInFiatTotal.minus(expensesInFiatTotal).toFixed(8);
  }

  private getTotalFeeGains(rows: TransactionTableRowI[]): string {
    if (rows.length === 0) {
      return '';
    }

    let totalFeeGains = new Decimal(0);
    rows.forEach((row) => {
      if (row.feeGain.length > 0) {
        totalFeeGains = totalFeeGains.plus(new Decimal(row.feeGain));
      }
    });

    return totalFeeGains.toFixed(8);
  }

  private getTotalFeeExpenses(rows: TransactionTableRowI[]): string {
    if (rows.length === 0) {
      return '';
    }

    let totalFeeExpenses = new Decimal(0);
    rows.forEach((row) => {
      if (row.feeExpenses.length > 0) {
        totalFeeExpenses = totalFeeExpenses.plus(new Decimal(row.feeExpenses));
      }
    });

    return totalFeeExpenses.toFixed(8);
  }

  private getTotalTradeGains(rows: TransactionTableRowI[]): string {
    if (rows.length === 0) {
      return '';
    }

    let totalTradeGains = new Decimal(0);
    rows.forEach((row) => {
      if (row.tradeGain.length > 0) {
        totalTradeGains = totalTradeGains.plus(new Decimal(row.tradeGain));
      }
    });

    return totalTradeGains.toFixed(8);
  }

  private getTotalTradeExpenses(rows: TransactionTableRowI[]): string {
    if (rows.length === 0) {
      return '';
    }

    let totalTradeExpenses = new Decimal(0);
    rows.forEach((row) => {
      if (row.tradeExpenses.length > 0) {
        totalTradeExpenses = totalTradeExpenses.plus(new Decimal(row.tradeExpenses));
      }
    });

    return totalTradeExpenses.toFixed(8);
  }

  private getTotalEarnOrLose(rows: TransactionTableRowI[]): string {
    if (rows.length === 0) {
      return '';
    }

    let totalEarnOrLose = new Decimal(0);
    rows.forEach((row) => {
      if (row.earnOrLose.length > 0) {
        totalEarnOrLose = totalEarnOrLose.plus(new Decimal(row.earnOrLose));
      }
    });

    return totalEarnOrLose.toFixed(8);
  }
}

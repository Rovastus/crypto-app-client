import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, WritableSignal, computed, inject, signal } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { AppNgxDatatable } from '../shared/ngx-datatable/app-ngx-datatable.component';
import { AppTableColumn, AppTableColumnSettings } from '../shared/ngx-datatable/app-ngx-datatable.model';
import { CoinInfoI } from '../store/coins/coin-info.model';
import { CoinInfoSelectors } from '../store/coins/coin-info.selectors';
import { EarnsApiActions } from '../store/earns/earns.action';
import { EarnI } from '../store/earns/earns.model';
import { EarnsSelectors } from '../store/earns/earns.selectors';
import { PortfolioSelectors } from '../store/portfolio/portfolio.selectors';
import { EarnTableRowI, EarnsTableDataI } from './earns.model';

@Component({
  selector: 'app-earns',
  templateUrl: './earns.component.html',
  styleUrls: ['./earns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EarnsComponent extends AppNgxDatatable implements OnInit {
  private readonly store = inject(Store);

  @ViewChild('dateTmpl', { static: true }) private dateTmpl!: TemplateRef<unknown>;
  @ViewChild('coinWithValueTmpl', { static: true }) private coinWithValueTmpl!: TemplateRef<unknown>;
  cols: WritableSignal<AppTableColumn[]> = signal([]);

  portfolio = this.store.selectSignal(PortfolioSelectors.selectCurrentPortfolio);

  loading = this.store.selectSignal(EarnsSelectors.selectEarnsLoading);

  private earns = this.store.selectSignal(EarnsSelectors.selectEarns);
  private coins = this.store.selectSignal(CoinInfoSelectors.selectCoinInfos);
  tableData = computed(() => {
    return this.mapEarnsTableData(this.earns(), this.coins());
  });

  ngOnInit(): void {
    const columnsSettings: AppTableColumnSettings = new Map([
      ['Id', { prop: 'id' }],
      ['Time', { cellTemplate: this.dateTmpl, prop: 'time' }],
      ['Amount', { cellTemplate: this.coinWithValueTmpl, prop: 'amount' }],
    ]);
    this.cols.set(this.createColumns(columnsSettings, undefined));
    this.loadEarns();
  }

  private loadEarns(): void {
    const portfolioId = this.portfolio()?.id;
    if (!portfolioId) return;

    this.store.dispatch(EarnsApiActions.loadEarns({ portfolioId }));
  }

  private mapEarnsTableData(earns: EarnI[] | undefined, coins: Dictionary<CoinInfoI>): EarnsTableDataI {
    if (!earns || !coins) {
      return {
        rows: [],
      };
    }

    const rows = earns.map<EarnTableRowI>((earn) => this.mapEarnToEarnTableRow(earn, coins));

    return {
      rows,
    };
  }

  private mapEarnToEarnTableRow(earn: EarnI, coins: Dictionary<CoinInfoI>): EarnTableRowI {
    const amountCoinImagePath = coins[earn.amountCoin]?.imagePath;

    return {
      id: earn.id,
      time: earn.time,
      amount: earn.amount,
      amountCoin: earn.amountCoin,
      amountCoinImagePath: amountCoinImagePath ?? '',
    };
  }
}

import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, WritableSignal, computed, inject, signal } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import Decimal from 'decimal.js';
import { AppNgxDatatable } from '../shared/ngx-datatable/app-ngx-datatable.component';
import { AppTableColumn, AppTableColumnSettings } from '../shared/ngx-datatable/app-ngx-datatable.model';
import { CoinInfoI } from '../store/coins/coin-info.model';
import { CoinInfoSelectors } from '../store/coins/coin-info.selectors';
import { PortfolioI } from '../store/portfolio/portfolio.model';
import { PortfolioSelectors } from '../store/portfolio/portfolio.selectors';
import { WalletI } from '../store/wallets/wallets.model';
import { WalletsSelectors } from '../store/wallets/wallets.selectors';
import { WalletTableRowI, WalletsTableDataI } from './info.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent extends AppNgxDatatable implements OnInit {
  private readonly store = inject(Store);

  @ViewChild('coinNameTmpl', { static: true }) private coinNameTmpl!: TemplateRef<unknown>;
  @ViewChild('coinWithValueTmpl', { static: true }) private coinWithValueTmpl!: TemplateRef<unknown>;
  @ViewChild('fiatWithValueTmpl', { static: true }) private fiatWithValueTmpl!: TemplateRef<unknown>;
  @ViewChild('fiatWithValueWithColorTmpl', { static: true }) private fiatWithValueWithColorTmpl!: TemplateRef<unknown>;
  cols: WritableSignal<AppTableColumn[]> = signal([]);

  portfolio = this.store.selectSignal(PortfolioSelectors.selectCurrentPortfolio);

  loading = this.store.selectSignal(WalletsSelectors.selectWalletsLoading);

  private wallet = this.store.selectSignal(WalletsSelectors.selectWallets);
  private coins = this.store.selectSignal(CoinInfoSelectors.selectCoinInfos);
  tableData = computed(() => {
    return this.mapWalletTableData(this.portfolio(), this.wallet(), this.coins());
  });

  ngOnInit(): void {
    const columnsSettings: AppTableColumnSettings = new Map([
      ['Coin', { cellTemplate: this.coinNameTmpl, name: 'Coin', prop: 'coin' }],
      ['Amount', { cellTemplate: this.coinWithValueTmpl, prop: 'coinAmount' }],
      ['Total', { cellTemplate: this.fiatWithValueTmpl, prop: 'total' }],
      ['Fiat per unit', { cellTemplate: this.fiatWithValueTmpl, prop: 'avcoFiatPerUnit' }],
      ['Earn or loss', { cellTemplate: this.fiatWithValueWithColorTmpl, prop: 'earnOrLoss' }],
    ]);
    this.cols.set(this.createColumns(columnsSettings, undefined));
  }

  private mapWalletTableData(portfolio: PortfolioI | undefined, wallets: WalletI[], coins: Dictionary<CoinInfoI>): WalletsTableDataI {
    if (!portfolio || !wallets || !coins) {
      return {
        rows: [],
        fiat: '',
        fiatImagePath: '',
        totalEarnOrLoss: '0',
      };
    }

    const rows = wallets.map<WalletTableRowI>((wallet) => this.mapWalletToWalletTableRow(wallet, coins));
    const totalEarnOrloss = this.getTotalEarnOrLoss(rows);
    const fiat = portfolio.fiat;
    const fiatImagePath = coins[fiat]?.imagePath;

    return {
      rows,
      totalEarnOrLoss: totalEarnOrloss,
      fiat,
      fiatImagePath: fiatImagePath ?? '',
    };
  }

  private mapWalletToWalletTableRow(wallet: WalletI, coins: Dictionary<CoinInfoI>): WalletTableRowI {
    const coinImagePath = coins[wallet.coin]?.imagePath;
    return {
      id: wallet.id,
      coin: wallet.coin,
      coinAmount: wallet.amount,
      coinImagePath: coinImagePath ?? '',
      avcoFiatPerUnit: wallet.avcoFiatPerUnit,
      total: this.calculateWalletTotal(wallet),
      earnOrLoss: this.calculateWalletEarnOrLoss(wallet, coins[wallet.coin]),
    };
  }

  private calculateWalletTotal(wallet: WalletI): string {
    return new Decimal(wallet.amount).mul(new Decimal(wallet.avcoFiatPerUnit)).toString();
  }

  private calculateWalletEarnOrLoss(wallet: WalletI, coinInfo: CoinInfoI | undefined): string {
    if (!coinInfo) {
      return '0';
    }

    const paidPrice = new Decimal(wallet.amount).mul(new Decimal(wallet.avcoFiatPerUnit));
    const currentPrice = new Decimal(wallet.amount).mul(new Decimal(coinInfo.priceInFiat));

    return currentPrice.minus(paidPrice).toFixed(8);
  }

  private getTotalEarnOrLoss(rows: WalletTableRowI[]): string {
    let totalEarnOrLoss = new Decimal(0);

    rows.forEach((row) => {
      totalEarnOrLoss = totalEarnOrLoss.plus(new Decimal(row.earnOrLoss));
    });

    return totalEarnOrLoss.toFixed(8);
  }
}

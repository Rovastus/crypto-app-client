import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CoinInfo } from '../store/coins/coin-info.model';
import { CoinInfoStoreType } from '../store/coins/coin-info.reducer';
import { CoinInfoSelectors } from '../store/coins/coin-info.selectors';
import { PortpholioApiActions } from '../store/portpholio/portpholio.actions';
import { PortpholioSelectors } from '../store/portpholio/portpholio.selectors';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  portpholio$!: Observable<any | undefined>;
  coins$: Observable<CoinInfoStoreType>;
  displayedColumns: string[] = ['id', 'coin', 'total', 'avcoFiatPerUnit', 'profit/loss'];

  constructor(private store: Store) {
    this.coins$ = this.store.select(CoinInfoSelectors.selectCoinInfoFeature);
  }

  ngOnInit(): void {
    this.portpholio$ = this.store.select(PortpholioSelectors.selectPortpholioDataFeature).pipe(
      switchMap((p) => {
        const portpholioId = p.currentPortpholioName?.id;

        if (portpholioId && p.portpholio?.id === portpholioId) {
          return this.store.select(PortpholioSelectors.selectPortpholio);
        } else if (portpholioId) {
          this.store.dispatch(PortpholioApiActions.loadPortpholio({ portpholioId }));
          return this.store.select(PortpholioSelectors.selectPortpholio);
        }

        return EMPTY;
      }),
    );
  }

  public calculateCurrentTotal(amount: number, avcoFiatPerUnit: number, coinInfo: CoinInfo | undefined): number {
    if (coinInfo) {
      return amount * coinInfo.priceInFiat - amount * avcoFiatPerUnit;
    }
    return 0;
  }

  public getTotalProfitLoss(
    wallet: {
      amount: any;
      coin: string;
      avcoFiatPerUnit: any;
    }[],
    coins: Map<string, CoinInfo> | null,
  ): number {
    if (wallet && coins) {
      return wallet.reduce((acc, value) => acc + this.calculateCurrentTotal(value.amount, value.avcoFiatPerUnit, coins.get(value.coin)), 0);
    }
    return 0;
  }
}

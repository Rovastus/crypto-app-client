import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { FiatEnum, GetPortpholioByIdGQL, TaxMethodEnum } from 'src/generated/graphql';
import { CoinInfo } from '../store/coins/coin-info.model';
import { CoinInfoActions } from '../store/coins/coin-info.types';
import { PortpholioDataStoreType } from '../store/portpholio/portpholio.reducer';
import { PortpholioActions } from '../store/portpholio/portpholio.types';

interface Portpholio {
	id: number;
	name: string;
	taxMethod: TaxMethodEnum;
	fiat: FiatEnum;
}

@Component({
	selector: 'app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
	portpholio$!: Observable<any | undefined>;
	coins$: Observable<Map<string, CoinInfo>>;
	displayedColumns: string[] = ['id', 'coin', 'total', 'avcoFiatPerUnit', 'profit/loss'];

	constructor(
		private store: Store<{
			portpholioData: PortpholioDataStoreType;
			coins: Map<string, CoinInfo>;
		}>,
	) {
		this.coins$ = this.store.select('coins');
	}

	ngOnInit(): void {
		this.portpholio$ = this.store.select('portpholioData').pipe(
			switchMap((p) => {
				const portpholioId = p.currentPortpholioName?.id;

				if (portpholioId && p.portpholio?.id === portpholioId) {
					return this.store.select('portpholioData').pipe(map((p) => p.portpholio));
				} else if (portpholioId) {
					this.store.dispatch(PortpholioActions.LOAD_PORTPHOLIO({ portpholioId }));
					return this.store.select('portpholioData').pipe(map((p) => p.portpholio));
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

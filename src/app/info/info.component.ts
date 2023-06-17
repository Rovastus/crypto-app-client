import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FiatEnum, GetPortpholioByIdGQL, TaxMethodEnum } from 'src/generated/graphql';
import { CoinService } from '../service/coin.service';
import { CoinInfo } from '../store/coins/coins.actions';

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
	portpholioId$: Observable<number>;
	portpholio$!: Observable<any>;
	coins$: Observable<Map<string, CoinInfo>>;
	displayedColumns: string[] = ['id', 'coin', 'total', 'avcoFiatPerUnit', 'profit/loss'];

	constructor(
		private getPortpholioByIdGQL: GetPortpholioByIdGQL,
		private store: Store<{
			portpholioId: number;
			coins: Map<string, CoinInfo>;
		}>,
		private coinService: CoinService,
	) {
		this.portpholioId$ = this.store.select('portpholioId');
		this.coins$ = this.store.select('coins');
	}

	ngOnInit(): void {
		this.portpholioId$.subscribe((portpholioId) => {
			if (portpholioId !== -1) {
				this.portpholio$ = this.getPortpholioByIdGQL
					.watch({
						portpholioId: portpholioId,
					})
					.valueChanges.pipe(
						map((result) => {
							if (result.data.getPortpholioById) {
								const coins: Set<string> = new Set();
								result.data.getPortpholioById.wallets.forEach((wallet) => {
									coins.add(wallet.coin);
								});
								this.coinService.fetchCoinInfo(coins);
							}

							return result.data.getPortpholioById;
						}),
					);
			}
		});
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

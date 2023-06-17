import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoinInfo, update } from '../store/coins/coins.actions';
import { environment } from 'src/environments/environment';
import { FiatEnum } from 'src/generated/graphql';
import { tap } from 'rxjs';
import { CoinInfoResponse } from './coin.model';

@Injectable({
	providedIn: 'root',
})
export class CoinService {
	private checkedCoins = new Set<string>();

	constructor(private http: HttpClient, private store: Store<{ coins: Map<string, CoinInfo> }>) {}

	private coinUrl = `${environment.livecoinwatchApi}coins/single`;

	fetchCoinInfo(coins: Set<string>): void {
		this.checkedCoins.forEach((checkedCoin) => coins.delete(checkedCoin));
		if (environment.generateLivecoinwatcTestData) {
			this.fetchTestCoinInfo(coins);
		} else {
			this.fetchApiCoinInfo(coins);
		}
	}

	private fetchTestCoinInfo(coins: Set<string>) {
		coins.forEach((coin) => {
			const coinInfo = { coin, priceInFiat: 100, imagePath: `${environment.coinImageUrl}${coin.toLowerCase()}.webp` };
			this.store.dispatch(update({ coinInfo }));
		});
	}

	private fetchApiCoinInfo(coins: Set<string>) {
		coins.forEach((coin) => {
			this.checkedCoins.add(coin);
			const headers = { 'content-type': 'application/json', 'x-api-key': environment.livecoinwatchApiKey };
			const body = { currency: FiatEnum.Eur, code: coin, meta: false };
			this.http
				.post<CoinInfoResponse>(this.coinUrl, body, { headers })
				.pipe(
					tap((data) =>
						this.store.dispatch(update({ coinInfo: { coin, priceInFiat: data.rate, imagePath: `${environment.coinImageUrl}${coin.toLowerCase()}.webp` } })),
					),
				);
		});
	}
}

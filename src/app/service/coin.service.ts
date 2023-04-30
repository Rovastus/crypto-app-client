import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoinInfo, update } from '../store/coins/coins.actions';
import { environment } from 'src/environments/environment';
import { FiatEnum } from 'src/generated/graphql';

@Injectable({
	providedIn: 'root',
})
export class CoinService {
	private checkedCoins = new Set<string>();

	constructor(private http: HttpClient, private store: Store<{ coins: Map<string, CoinInfo> }>) {}

	fetchCoinInfo(coins: Set<string>): void {
		this.checkedCoins.forEach((checkedCoin) => coins.delete(checkedCoin));
		if (environment.generateLivecoinwatcTestData) {
			coins.forEach((coin) => {
				const coinInfo = {
					coin,
					priceInFiat: 100,
					imagePath: `${environment.coinImageUrl}${coin.toLowerCase()}.webp`,
				};
				this.store.dispatch(update({ coinInfo }));
			});
		} else {
			const coinUrl = `${environment.livecoinwatchApi}coins/single`;
			coins.forEach((coin) => {
				this.checkedCoins.add(coin);
				const headers = {
					'content-type': 'application/json',
					'x-api-key': environment.livecoinwatchApiKey,
				};
				const body = {
					currency: FiatEnum.Eur,
					code: coin,
					meta: false,
				};
				this.http
					.post<{
						rate: number;
						volume: number;
						cap: number;
					}>(coinUrl, body, {
						headers,
					})
					.subscribe((data) => {
						const coinInfo = {
							coin,
							priceInFiat: data.rate,
							imagePath: `${environment.coinImageUrl}${coin.toLowerCase()}.webp`,
						};
						this.store.dispatch(update({ coinInfo }));
					});
			});
		}
	}
}

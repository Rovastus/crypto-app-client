import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FiatEnum } from 'src/generated/graphql';
import { CoinInfoI } from '../../store/coins/coin-info.model';
import { CoinInfoResponse } from './coin-info.model';

@Injectable({
  providedIn: 'root',
})
export class CoinInfoService {
  private readonly coinUrl = `${environment.livecoinwatchApi}coins/map`;
  private readonly headers = { headers: { 'content-type': 'application/json', 'x-api-key': environment.livecoinwatchApiKey } };
  private readonly coinsWithSameNameMap: Map<string, string> = new Map<string, string>([['ACA', '__ACA']]);
  private readonly coinsWithSameNameReverseMap: Map<string, string> = new Map<string, string>([['__ACA', 'ACA']]);

  constructor(private http: HttpClient) {}

  fetchCoinInfo(coins: string[]): Observable<CoinInfoI[]> {
    this.checkCoinsWithSameName(coins);

    if (environment.generateLivecoinwatcTestData) {
      return this.fetchTestCoinInfo(coins);
    } else {
      return this.fetchApiCoinInfo(coins);
    }
  }

  private fetchTestCoinInfo(coins: string[]): Observable<CoinInfoI[]> {
    const coinInfos: CoinInfoI[] = [];
    coins.forEach((coin) => {
      coinInfos.push({ coin, priceInFiat: 100, imagePath: `${environment.coinImageUrl}${coin.toLowerCase()}.webp` });
    });
    return of(coinInfos);
  }

  private fetchApiCoinInfo(coins: string[]): Observable<CoinInfoI[]> {
    const body = { currency: FiatEnum.Eur, codes: coins, meta: false };
    return this.http.post<CoinInfoResponse[]>(this.coinUrl, body, this.headers).pipe(
      map((data) => {
        const coinInfos: CoinInfoI[] = [];

        data.forEach((coin) => {
          const newCoinValue = this.coinsWithSameNameMap.get(coin.code);

          if (newCoinValue) {
            coin.code = newCoinValue;
          }

          coinInfos.push({ coin: coin.code, priceInFiat: coin.rate, imagePath: `${environment.coinImageUrl}${coin.code.toLowerCase()}.webp` });
        });
        return coinInfos;
      }),
    );
  }

  private checkCoinsWithSameName(coins: string[]): string[] {
    coins.forEach((coin) => {
      const newCoinValue = this.coinsWithSameNameMap.get(coin);

      if (newCoinValue) {
        coin = newCoinValue;
      }
    });

    return coins;
  }
}

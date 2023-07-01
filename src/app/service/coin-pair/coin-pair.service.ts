import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  CoinPairPriceHistoryKrakenJsonData,
  ImportCoinPairPriceHistoryKrakenDataGQL,
  ImportCoinPairPriceHistoryKrakenDataMutation,
  InitCoinPairsGQL,
  InitCoinPairsMutation,
} from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class CoinPairService {
  private readonly initCoinPairsGQL = inject(InitCoinPairsGQL);
  private readonly importKrakenCoinPairsGQL = inject(ImportCoinPairPriceHistoryKrakenDataGQL);

  initCoinPairs(): Observable<InitCoinPairsMutation> {
    return this.initCoinPairsGQL.mutate().pipe(
      map((result) => {
        if (result.errors) throw result.errors;
        if (!result.data) throw 'No data was created';

        return result.data;
      }),
    );
  }

  importKrakenCoinPair(coinPair: string, jsonData: CoinPairPriceHistoryKrakenJsonData[]): Observable<ImportCoinPairPriceHistoryKrakenDataMutation> {
    return this.importKrakenCoinPairsGQL.mutate({ coinPair, jsonData }).pipe(
      map((result) => {
        if (result.errors) throw result.errors;
        if (!result.data) throw 'No data was created';

        return result.data;
      }),
    );
  }
}

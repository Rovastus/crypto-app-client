import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { CoinPairService } from 'src/app/service/coin-pair/coin-pair.service';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { LOADING_FALSE, LOADING_TRUE } from '../constants';
import { CoinPairApiActions, CoinPairLoadingActions } from './coin-pair.actions';

@Injectable()
export class CoinPairEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly coinPairService = inject(CoinPairService);
  private readonly snackBar = inject(SnackBarService);

  initBinanceCoinPairs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoinPairApiActions.initBinanceCoinPairs),
      tap(() => this.store.dispatch(CoinPairLoadingActions.setInitBinanceCoinPairsLoading(LOADING_TRUE))),
      mergeMap(() =>
        this.coinPairService.initCoinPairs().pipe(
          catchError(() => {
            this.store.dispatch(CoinPairLoadingActions.setInitBinanceCoinPairsLoading(LOADING_FALSE));
            this.snackBar.displayError('Error while init coin pairs');
            return EMPTY;
          }),
          map(() => {
            this.snackBar.displayInfo('Binance coin pairs init was successfull');
            return CoinPairLoadingActions.setInitBinanceCoinPairsLoading(LOADING_FALSE);
          }),
        ),
      ),
    ),
  );

  importKrakenCoinPair$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoinPairApiActions.importKrakenCoinPair),
      tap(() => this.store.dispatch(CoinPairLoadingActions.setImportKrakenCoinPairLoading(LOADING_TRUE))),
      mergeMap(({ coinPair, jsonData }) =>
        this.coinPairService.importKrakenCoinPair(coinPair, jsonData).pipe(
          catchError(() => {
            this.store.dispatch(CoinPairLoadingActions.setImportKrakenCoinPairLoading(LOADING_FALSE));
            this.snackBar.displayError('Error while init coin pairs');
            return EMPTY;
          }),
          map(() => {
            this.snackBar.displayInfo('Kraken coin pair import was successfull');
            return CoinPairLoadingActions.setImportKrakenCoinPairLoading(LOADING_FALSE);
          }),
        ),
      ),
    ),
  );
}

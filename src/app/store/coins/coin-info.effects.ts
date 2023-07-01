import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, takeUntil } from 'rxjs/operators';
import { CoinInfoService } from 'src/app/service/coin-info/coin-info.service';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { CoinInfoActions, CoinInfoApiActions } from './coin-info.actions';

@Injectable()
export class CoinInfosEffects {
  private readonly actions$ = inject(Actions);
  private readonly coinInfoService = inject(CoinInfoService);
  private readonly snackBar = inject(SnackBarService);

  loadCoinInfos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoinInfoApiActions.loadCoinInfos),
      mergeMap((props) =>
        this.coinInfoService.fetchCoinInfo(props.coins).pipe(
          takeUntil(this.actions$.pipe(ofType(CoinInfoApiActions.loadCoinInfos))),
          catchError(() => {
            this.snackBar.displayError('Error while loading coin infos');
            return EMPTY;
          }),
          map((coinInfos) => CoinInfoActions.updateCoinInfos({ coinInfos })),
        ),
      ),
    ),
  );
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { CoinInfoService } from 'src/app/service/coin-info/coin-info.service';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { CoinInfoActions, CoinInfoApiActions } from './coin-info.actions';

@Injectable()
export class CoinInfosEffects {
  loadCoinInfos$;

  constructor(private actions$: Actions, private coinInfoService: CoinInfoService, private snackBar: SnackBarService) {
    this.loadCoinInfos$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CoinInfoApiActions.loadCoinInfos),
        exhaustMap((props) =>
          this.coinInfoService.fetchCoinInfo(props.coins).pipe(
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
}

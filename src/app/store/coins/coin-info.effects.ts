import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { CoinInfoActions } from './coin-info.types';
import { CoinInfoService } from 'src/app/service/coin-info/coin-info.service';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';

@Injectable()
export class CoinInfosEffects {
	loadCoinInfos$;

	constructor(private actions$: Actions, private coinInfoService: CoinInfoService, private snackBar: SnackBarService) {
		this.loadCoinInfos$ = createEffect(() =>
			this.actions$.pipe(
				ofType(CoinInfoActions.LOAD_COIN_INFOS),
				exhaustMap((props) =>
					this.coinInfoService.fetchCoinInfo(props.coins).pipe(
						map((coinInfos) => CoinInfoActions.UPDATE_COIN_INFOS({ coinInfos })),
						catchError(() => {
							this.snackBar.displayError('Error while loading coin infos');
							return EMPTY;
						}),
					),
				),
			),
		);
	}
}

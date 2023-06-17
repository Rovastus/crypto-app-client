import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { CoinInfoActions } from './coin-info.types';
import { CoinInfoService } from 'src/app/service/coin-info/coin-info.service';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';

@Injectable()
export class CoinInfosEffects {
	loadCoinInfos$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CoinInfoActions.loadCoinInfos),
			exhaustMap((props) =>
				this.coinInfoService.fetchCoinInfo(props.coins).pipe(
					map((coinInfos) => CoinInfoActions.updateCoinInfos({ coinInfos })),
					catchError(() => {
						this.snackBar.displayError('Error while loading coin infos');
						return EMPTY;
					}),
				),
			),
		),
	);

	constructor(private actions$: Actions, private coinInfoService: CoinInfoService, private snackBar: SnackBarService) {}
}

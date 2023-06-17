import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { PortpholioService } from 'src/app/service/portpholio/portpholio.service';
import { PortpholioActions } from './portpholio.types';
import { CoinInfoActions } from '../coins/coin-info.types';

@Injectable()
export class PortpholioEffects {
	loadPortpholiosNames$;
	loadPortpholio$;

	constructor(private actions$: Actions, private portpholioService: PortpholioService, private snackBar: SnackBarService) {
		this.loadPortpholiosNames$ = createEffect(() =>
			this.actions$.pipe(
				ofType(PortpholioActions.LOAD_PORTPHOLIOS_NAMES),
				exhaustMap(() =>
					this.portpholioService.getAllPortpholiosNames().pipe(
						map((portpholiosNames) => PortpholioActions.SET_PORTPHOLIOS_NAMES({ portpholiosNames })),
						catchError(() => {
							this.snackBar.displayError('Error while loading portpholios');
							return EMPTY;
						}),
					),
				),
			),
		);

		this.loadPortpholio$ = createEffect(() =>
			this.actions$.pipe(
				ofType(PortpholioActions.LOAD_PORTPHOLIO),
				exhaustMap(({ portpholioId }) =>
					this.portpholioService.getPortpholioById(portpholioId).pipe(
						tap((portpholio) => {
							const coins: Set<string> = new Set();
							portpholio.wallets.forEach((wallet) => {
								coins.add(wallet.coin);
							});
							CoinInfoActions.LOAD_COIN_INFOS({ coins });
						}),
						map((portpholio) => PortpholioActions.SET_PORTPHOLIO({ portpholio })),
						catchError(() => {
							this.snackBar.displayError('Error while loading portpholio');
							return EMPTY;
						}),
					),
				),
			),
		);
	}
}

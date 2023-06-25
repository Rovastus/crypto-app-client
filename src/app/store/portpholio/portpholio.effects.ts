import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { PortpholioService } from 'src/app/service/portpholio/portpholio.service';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { CoinInfoApiActions } from '../coins/coin-info.actions';
import { PortpholioActions, PortpholioApiActions } from './portpholio.actions';

@Injectable()
export class PortpholioEffects {
  loadPortpholiosNames$;
  loadPortpholio$;

  constructor(private actions$: Actions, private portpholioService: PortpholioService, private snackBar: SnackBarService) {
    this.loadPortpholiosNames$ = createEffect(() =>
      this.actions$.pipe(
        ofType(PortpholioApiActions.loadPortpholiosNames),
        exhaustMap(() =>
          this.portpholioService.getAllPortpholiosNames().pipe(
            catchError(() => {
              this.snackBar.displayError('Error while loading portpholios');
              return EMPTY;
            }),
            map((portpholiosNames) => PortpholioActions.setPortpholiosNames({ portpholiosNames })),
          ),
        ),
      ),
    );

    this.loadPortpholio$ = createEffect(() =>
      this.actions$.pipe(
        ofType(PortpholioApiActions.loadPortpholio),
        exhaustMap(({ portpholioId }) =>
          this.portpholioService.getPortpholioById(portpholioId).pipe(
            catchError(() => {
              this.snackBar.displayError('Error while loading portpholio');
              return EMPTY;
            }),
            tap((portpholio) => {
              const coins: Set<string> = new Set();
              portpholio.wallets.forEach((wallet) => {
                coins.add(wallet.coin);
              });
              CoinInfoApiActions.loadCoinInfos({ coins });
            }),
            map((portpholio) => PortpholioActions.setPortpholio({ portpholio })),
          ),
        ),
      ),
    );
  }
}

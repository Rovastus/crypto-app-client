import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { WalletsService } from 'src/app/service/wallets/wallets.service';
import { CoinInfoApiActions } from '../coins/coin-info.actions';
import { WalletsActions, WalletsApiActions } from './wallets.action';

@Injectable()
export class WalletsEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly walletsService = inject(WalletsService);
  private readonly snackBarService = inject(SnackBarService);

  loadWallets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletsApiActions.loadWallets),
      mergeMap(({ portfolioId }) =>
        this.walletsService.getWalletsByPortfolioId(portfolioId).pipe(
          takeUntil(this.actions$.pipe(ofType(WalletsApiActions.loadWallets))),
          catchError(() => {
            this.snackBarService.displayError('Error while loading wallets');
            return EMPTY;
          }),
          tap((wallets) => {
            const coins: Set<string> = new Set();
            wallets.forEach((wallet) => {
              coins.add(wallet.coin);
            });
            this.store.dispatch(CoinInfoApiActions.loadCoinInfos({ coins }));
          }),
          map((wallets) => WalletsActions.setWallets({ portfolioId, wallets })),
        ),
      ),
    ),
  );
}

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, takeUntil } from 'rxjs/operators';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { WalletsService } from 'src/app/service/wallets/wallets.service';
import { WalletsActions, WalletsApiActions } from './wallets.action';

@Injectable()
export class WalletsEffects {
  private readonly actions$ = inject(Actions);
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
          map((wallets) => WalletsActions.setWallets({ portfolioId, wallets })),
        ),
      ),
    ),
  );
}

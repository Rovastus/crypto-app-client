import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, filter, map, mergeMap, takeUntil } from 'rxjs/operators';
import { INFO_ROUTER_PATH } from 'src/app/app-router.module';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { WalletsService } from 'src/app/service/wallets/wallets.service';
import { PortfolioActions } from '../portfolio/portfolio.actions';
import { WalletsActions, WalletsApiActions } from './wallets.action';

@Injectable()
export class WalletsEffects {
  private readonly actions$ = inject(Actions);
  private readonly walletsService = inject(WalletsService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly router = inject(Router);

  triggerLoadWallets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.setCurrentPortfolio),
      filter(() => this.router.url === '/' + INFO_ROUTER_PATH),
      map(({ portfolio }) => {
        return WalletsApiActions.loadWallets({ portfolioId: portfolio.id });
      }),
    ),
  );

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

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, takeUntil } from 'rxjs/operators';
import { CoinInfoService } from 'src/app/service/coin-info/coin-info.service';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { PortfolioActions } from '../portfolio/portfolio.actions';
import { CoinInfoActions } from './coin-info.actions';

@Injectable()
export class CoinInfosEffects {
  private readonly actions$ = inject(Actions);
  private readonly coinInfoService = inject(CoinInfoService);
  private readonly snackBar = inject(SnackBarService);

  loadCoinInfos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.setCurrentPortfolio),
      mergeMap(({ portfolio }) =>
        this.coinInfoService.fetchCoinInfo(portfolio.coins).pipe(
          takeUntil(this.actions$.pipe(ofType(PortfolioActions.setCurrentPortfolio))),
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

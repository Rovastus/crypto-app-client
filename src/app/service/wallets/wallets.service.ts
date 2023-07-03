import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { WalletI } from 'src/app/store/wallets/wallets.model';
import { GetWalletsByPortfolioIdGQL } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class WalletsService {
  private readonly walletsByPortfolioId = inject(GetWalletsByPortfolioIdGQL);

  getWalletsByPortfolioId(portfolioId: number): Observable<WalletI[]> {
    return this.walletsByPortfolioId.fetch({ portfolioId }).pipe(
      map((result) => {
        if (result.errors) throw result.errors;
        if (!result.data) throw 'No data was created';

        return result.data.getWalletsByPortfolioId;
      }),
    );
  }
}

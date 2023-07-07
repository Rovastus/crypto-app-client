import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CreatePortfolioI, PortfolioI } from 'src/app/store/portfolio/portfolio.model';
import { AllPortfoliosGQL, CreatePortfolioGQL } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private readonly allPortfoliosGQL = inject(AllPortfoliosGQL);
  private readonly createPortfolioGQL = inject(CreatePortfolioGQL);

  getAllPortfolios(): Observable<PortfolioI[]> {
    return this.allPortfoliosGQL.fetch().pipe(
      map((result) => {
        if (result.errors) throw result.errors;
        if (!result.data) throw 'No data was created';

        return result.data.allPortfolios.map<PortfolioI>((portfolio) => {
          return {
            id: portfolio.id,
            name: portfolio.name,
            taxMethod: portfolio.taxMethod,
            fiat: portfolio.fiat,
            coins: portfolio.wallets.map((wallet) => wallet.coin),
          };
        });
      }),
    );
  }

  createPortfolio(portfolio: CreatePortfolioI): Observable<PortfolioI> {
    return this.createPortfolioGQL.mutate(portfolio).pipe(
      map((result) => {
        if (result.errors) throw result.errors;
        if (!result.data) throw 'No data was created';

        const portfolio = result.data.createPortfolio;
        return {
          id: portfolio.id,
          name: portfolio.name,
          taxMethod: portfolio.taxMethod,
          fiat: portfolio.fiat,
          coins: portfolio.wallets.map((wallet) => wallet.coin),
        };
      }),
    );
  }
}

import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CreatePortfolioI, PortfolioI, PortfolioNameI } from 'src/app/store/portfolio/portfolio.model';
import { AllPortfoliosGQL, CreatePortfolioGQL, CreatePortfolioMutation, GetPortfolioByIdGQL } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private readonly allPortfoliosGQL = inject(AllPortfoliosGQL);
  private readonly getPortfolioByIdGQL = inject(GetPortfolioByIdGQL);
  private readonly createPortfolioGQL = inject(CreatePortfolioGQL);

  getAllPortfoliosNames(): Observable<PortfolioNameI[]> {
    return this.allPortfoliosGQL.fetch().pipe(
      map((result) =>
        result.data.allPortfolios.map((p) => {
          return { id: p.id, name: p.name };
        }),
      ),
    );
  }

  getPortfolioById(portfolioId: number): Observable<PortfolioI> {
    return this.getPortfolioByIdGQL.fetch({ portfolioId }).pipe(map((result) => result.data.getPortfolioById));
  }

  createPortfolio(portfolio: CreatePortfolioI): Observable<CreatePortfolioMutation> {
    return this.createPortfolioGQL.mutate({ ...portfolio }).pipe(
      map((result) => {
        if (result.errors) throw result.errors;
        if (!result.data) throw 'No data was created';

        return result.data;
      }),
    );
  }
}

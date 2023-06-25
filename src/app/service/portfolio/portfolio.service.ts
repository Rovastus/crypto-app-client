import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PortfolioI, PortfolioNameI } from 'src/app/store/portfolio/portfolio.model';
import { AllPortfoliosGQL, GetPortfolioByIdGQL } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  constructor(private allPortfoliosGQL: AllPortfoliosGQL, private getPortfolioByIdGQL: GetPortfolioByIdGQL) { }

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
}

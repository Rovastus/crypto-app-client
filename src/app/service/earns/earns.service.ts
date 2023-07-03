import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EarnI } from 'src/app/store/earns/earns.model';
import { EarnsByPortfolioIdGQL } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class EarnsService {
  private readonly earnsByPortfolioIdGQL = inject(EarnsByPortfolioIdGQL);

  getEarnsByPortfolioId(portfolioId: number): Observable<EarnI[]> {
    return this.earnsByPortfolioIdGQL.fetch({ portfolioId }).pipe(
      map((result) => {
        if (result.errors) throw result.errors;
        if (!result.data) throw 'No data found';

        return result.data.earnsByPortfolioId;
      }),
    );
  }
}

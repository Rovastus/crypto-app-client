import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TransactionI } from 'src/app/store/transactions/transactions.model';
import { TransactionsByPortfolioIdGQL } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly getTransactionsByPortfolioIdGQL = inject(TransactionsByPortfolioIdGQL);

  getTransactionsByPortfolioIdGQ(portfolioId: number): Observable<TransactionI[]> {
    return this.getTransactionsByPortfolioIdGQL.fetch({ portfolioId }).pipe(
      map((result) => {
        if (result.errors) throw result.errors;
        if (!result.data) throw 'No data found';

        return result.data.transactionsByPortfolioId;
      }),
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EarnsByPortfolioIdGQL } from 'src/generated/graphql';
import { CoinInfo } from '../store/coins/coin-info.model';

@Component({
  selector: 'app-earns',
  templateUrl: './earns.component.html',
  styleUrls: ['./earns.component.css'],
})
export class EarnsComponent implements OnInit {
  portfolioId$: Observable<number>;
  coins$: Observable<Map<string, CoinInfo>>;
  earns$!: Observable<any>;
  displayedColumns: string[] = ['id', 'time', 'amount'];

  constructor(
    private getEarnsByPortfolioIdGQL: EarnsByPortfolioIdGQL,
    private store: Store<{
      portfolioId: number;
      coins: Map<string, CoinInfo>;
    }>,
  ) {
    this.portfolioId$ = this.store.select('portfolioId');
    this.coins$ = this.store.select('coins');
  }

  ngOnInit(): void {
    this.portfolioId$.subscribe((portfolioId) => {
      if (portfolioId !== -1) {
        this.earns$ = this.getEarnsByPortfolioIdGQL
          .watch({
            portfolioId,
          })
          .valueChanges.pipe(map((result) => result.data.earnsByPortfolioId));
      }
    });
  }
}

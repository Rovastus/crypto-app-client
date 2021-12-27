import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EarnsByPortpholioIdGQL } from 'src/generated/graphql';
import { CoinInfo } from '../store/coins/coins.actions';

@Component({
  selector: 'app-earns',
  templateUrl: './earns.component.html',
  styleUrls: ['./earns.component.css'],
})
export class EarnsComponent implements OnInit {
  portpholioId$: Observable<number>;
  coins$: Observable<Map<string, CoinInfo>>;
  earns$!: Observable<any>;
  displayedColumns: string[] = ['id', 'time', 'amount'];

  constructor(
    private getEarnsByPortpholioIdGQL: EarnsByPortpholioIdGQL,
    private store: Store<{
      portpholioId: number;
      coins: Map<string, CoinInfo>;
    }>
  ) {
    this.portpholioId$ = this.store.select('portpholioId');
    this.coins$ = this.store.select('coins');
  }

  ngOnInit(): void {
    this.portpholioId$.subscribe((portpholioId) => {
      if (portpholioId !== -1) {
        this.earns$ = this.getEarnsByPortpholioIdGQL
          .watch({
            portpholioId,
          })
          .valueChanges.pipe(map((result) => result.data.earnsByPortpholioId));
      }
    });
  }
}

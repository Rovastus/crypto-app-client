import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WithdrawsByPortpholioIdGQL } from 'src/generated/graphql';
import { CoinInfo } from '../store/coins/coins.actions';

@Component({
  selector: 'app-withdraws',
  templateUrl: './withdraws.component.html',
  styleUrls: ['./withdraws.component.css'],
})
export class WithdrawsComponent implements OnInit {
  portpholioId$: Observable<number>;
  coins$: Observable<Map<string, CoinInfo>>;
  withdraws$!: Observable<any>;
  displayedColumns: string[] = ['id', 'time', 'amount'];

  constructor(
    private getWithdrawsByPortpholioIdGQL: WithdrawsByPortpholioIdGQL,
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
        this.withdraws$ = this.getWithdrawsByPortpholioIdGQL
          .watch({
            portpholioId,
          })
          .valueChanges.pipe(
            map((result) => result.data.withdrawsByPortpholioId)
          );
      }
    });
  }
}

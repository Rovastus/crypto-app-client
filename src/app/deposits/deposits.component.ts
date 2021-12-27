import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoinInfo } from 'src/app/store/coins/coins.actions';
import { DepositsByPortpholioIdGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css'],
})
export class DepositsComponent implements OnInit {
  portpholioId$: Observable<number>;
  coins$: Observable<Map<string, CoinInfo>>;
  deposits$!: Observable<any>;
  displayedColumns: string[] = ['id', 'time', 'amount'];

  constructor(
    private getDepositsByPortpholioIdGQL: DepositsByPortpholioIdGQL,
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
        this.deposits$ = this.getDepositsByPortpholioIdGQL
          .watch({
            portpholioId,
          })
          .valueChanges.pipe(
            map((result) => result.data.depositsByPortpholioId)
          );
      }
    });
  }

  getTotalDeposits(
    deposits: {
      amount: string;
    }[]
  ): number {
    if (deposits !== null) {
      return deposits.reduce((acc, value) => acc + parseFloat(value.amount), 0);
    }

    return 0;
  }
}

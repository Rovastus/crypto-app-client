import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WithdrawsByPortpholioIdGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-withdraws',
  templateUrl: './withdraws.component.html',
  styleUrls: ['./withdraws.component.css'],
})
export class WithdrawsComponent implements OnInit {
  portpholioId$: Observable<number>;
  withdraws$!: Observable<any>;
  displayedColumns: string[] = ['id', 'time', 'amount'];

  constructor(
    private getWithdrawsByPortpholioIdGQL: WithdrawsByPortpholioIdGQL,
    private store: Store<{ portpholioId: number }>
  ) {
    this.portpholioId$ = this.store.select('portpholioId');
  }

  ngOnInit(): void {
    this.portpholioId$.subscribe((portpholioId) => {
      if (portpholioId != -1) {
        this.withdraws$ = this.getWithdrawsByPortpholioIdGQL
          .watch({
            portpholioId: portpholioId,
          })
          .valueChanges.pipe(
            map((result) => result.data.withdrawsByPortpholioId)
          );
      }
    });
  }
}

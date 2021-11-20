import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DepositsByPortpholioIdGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css'],
})
export class DepositsComponent implements OnInit {
  portpholioId$: Observable<number>;
  deposits$!: Observable<any>;
  displayedColumns: string[] = ['id', 'time', 'amount'];

  constructor(
    private getDepositsByPortpholioIdGQL: DepositsByPortpholioIdGQL,
    private store: Store<{ portpholioId: number }>
  ) {
    this.portpholioId$ = this.store.select('portpholioId');
  }

  ngOnInit(): void {
    this.portpholioId$.subscribe((portpholioId) => {
      if (portpholioId != -1) {
        this.deposits$ = this.getDepositsByPortpholioIdGQL
          .watch({
            portpholioId: portpholioId,
          })
          .valueChanges.pipe(
            map((result) => result.data.depositsByPortpholioId)
          );
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EarnsByPortpholioIdGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-earns',
  templateUrl: './earns.component.html',
  styleUrls: ['./earns.component.css'],
})
export class EarnsComponent implements OnInit {
  portpholioId$: Observable<number>;
  earns$!: Observable<any>;
  displayedColumns: string[] = ['id', 'time', 'amount'];

  constructor(
    private getEarnsByPortpholioIdGQL: EarnsByPortpholioIdGQL,
    private store: Store<{ portpholioId: number }>
  ) {
    this.portpholioId$ = this.store.select('portpholioId');
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

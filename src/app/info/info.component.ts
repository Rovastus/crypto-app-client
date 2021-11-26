import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Fiat, GetPortpholioByIdGQL, TaxMethod } from 'src/generated/graphql';

interface Portpholio {
  id: number;
  name: string;
  taxMethod: TaxMethod;
  fiat: Fiat;
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  portpholioId$: Observable<number>;
  portpholio$!: Observable<any>;

  constructor(
    private getPortpholioByIdGQL: GetPortpholioByIdGQL,
    private store: Store<{ portpholioId: number }>
  ) {
    this.portpholioId$ = this.store.select('portpholioId');
  }

  ngOnInit(): void {
    this.portpholioId$.subscribe((portpholioId) => {
      if (portpholioId !== -1) {
        this.portpholio$ = this.getPortpholioByIdGQL
          .watch({
            id: portpholioId,
          })
          .valueChanges.pipe(map((result) => result.data.portpholio));
      }
    });
  }
}

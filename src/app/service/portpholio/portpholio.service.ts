import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PortpholioI, PortpholioNameI } from 'src/app/store/portpholio/portpholio.model';
import { AllPortpholiosGQL, GetPortpholioByIdGQL } from 'src/generated/graphql';

@Injectable({
	providedIn: 'root',
})
export class PortpholioService {
	constructor(private allPortpholiosGQL: AllPortpholiosGQL, private getPortpholioByIdGQL: GetPortpholioByIdGQL) {}

	getAllPortpholiosNames(): Observable<PortpholioNameI[]> {
		return this.allPortpholiosGQL.fetch().pipe(
			map((result) =>
				result.data.allPortpholios.map((p) => {
					return { id: p.id, name: p.name };
				}),
			),
		);
	}

	getPortpholioById(portpholioId: number): Observable<PortpholioI> {
		return this.getPortpholioByIdGQL.fetch({ portpholioId }).pipe(map((result) => result.data.getPortpholioById));
	}
}

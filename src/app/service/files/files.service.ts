import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CreateFileI, FileI } from 'src/app/store/files/files.model';
import { FilesByPortfolioIdGQL, ImportFileGQL } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private readonly getFilesByPortfolioIdGQL = inject(FilesByPortfolioIdGQL);
  private readonly importFileGQL = inject(ImportFileGQL);

  getFilesByPortfolioId(portfolioId: number): Observable<FileI[]> {
    return this.getFilesByPortfolioIdGQL.fetch({ portfolioId }).pipe(
      map((result) => {
        if (result.errors) throw result.errors;
        if (!result.data) throw 'No data found';

        return result.data.filesByPortfolioId.map<FileI>((file) => {
          return { id: file.id, name: file.name };
        });
      }),
    );
  }

  createFile(createFile: CreateFileI): Observable<FileI> {
    return this.importFileGQL.mutate(createFile).pipe(
      map((result) => {
        if (result.errors) throw result.errors;
        if (!result.data) throw 'No data was created';

        const file = result.data.importFile;
        return { id: file.id, name: file.name };
      }),
    );
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';
import { FilesService } from 'src/app/service/files/files.service';
import { FilesSelectors } from 'src/app/store/files/files.selectors';
import { PortfolioSelectors } from 'src/app/store/portfolio/portfolio.selectors';
import { FileJsonData } from 'src/generated/graphql';

@Component({
  selector: 'app-files-dialog',
  templateUrl: './files-dialog.component.html',
  styleUrls: ['./files-dialog.component.scss'],
})
export class FilesDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<FilesDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly filesService = inject(FilesService);

  exportForm = this.formBuilder.group({
    nameField: [null, Validators.required],
    fileField: [null, Validators.required],
  });

  private closeDialogWhenLoadingFinished = false;
  loading$ = this.store.select(FilesSelectors.selectCreationFileLoading).pipe(
    tap((loading) => {
      if (!loading && this.closeDialogWhenLoadingFinished) {
        this.dialogRef.close();
      }
    }),
  );

  portfolioId$ = this.store.select(PortfolioSelectors.selectCurrentPortfolio).pipe(
    take(1),
    map((portfolio) => portfolio?.id),
  );

  createExport(portfolioId: number | undefined): void {
    if (!this.exportForm.valid) {
      return;
    }

    const name = this.exportForm.value.nameField;
    const file = this.exportForm.value.fileField;

    if (!name || !file || !portfolioId) {
      return;
    }

    this.processCsvData(portfolioId, name, file);
  }

  private processCsvData(portfolioId: number, name: string, file: Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      const jsonData = this.getCsvData(reader.result as string);
      this.filesService.createFile({ portfolioId, name, jsonData });
    };
    reader.readAsBinaryString(file);
  }

  private getCsvData(data: string): FileJsonData[] {
    const lines = data.split('\n');
    const result: FileJsonData[] = [];
    const headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
      const obj: FileJsonData = {
        utcTime: '',
        operation: '',
        description: '',
        data: '',
      };
      const currentline = lines[i].split(',');
      if (currentline.length === 1) {
        continue;
      }
      for (let j = 0; j < headers.length; j++) {
        switch (headers[j]) {
          case 'UTC_Time':
            obj.utcTime = currentline[j];
            break;
          case 'Operation':
            obj.operation = currentline[j];
            break;
          case 'Description':
            obj.description = currentline[j];
            break;
          case 'Data':
            obj.data = currentline[j];
            break;
          default:
            break;
        }
      }
      result.push(obj);
    }

    console.log(result);
    return result;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

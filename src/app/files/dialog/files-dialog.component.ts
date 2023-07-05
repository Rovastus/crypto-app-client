import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FilesApiActions } from 'src/app/store/files/files.actions';
import { FilesSelectors } from 'src/app/store/files/files.selectors';
import { PortfolioSelectors } from 'src/app/store/portfolio/portfolio.selectors';
import { FileJsonData } from 'src/generated/graphql';

@Component({
  selector: 'app-files-dialog',
  templateUrl: './files-dialog.component.html',
  styleUrls: ['./files-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<FilesDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);

  exportForm = this.formBuilder.nonNullable.group({
    nameField: ['', Validators.required],
    fileField: [null, Validators.required],
  });

  private closeDialogWhenLoadingFinished = signal(false);
  creationFileLoading = this.store.selectSignal(FilesSelectors.selectCreationFileLoading);
  private closeDialogRefEffect = effect(() => {
    if (!this.creationFileLoading() && this.closeDialogWhenLoadingFinished()) {
      this.dialogRef.close();
    }
  });

  private portfolioId = this.store.selectSignal(PortfolioSelectors.selectCurrentPortfolioId);

  createExport(): void {
    if (!this.exportForm.valid) {
      return;
    }

    const name = this.exportForm.value.nameField;
    const file = this.exportForm.value.fileField;
    const portfolioId = this.portfolioId();

    if (!name || !file || !portfolioId) {
      return;
    }

    this.processCsvData(portfolioId, name, file);
  }

  private processCsvData(portfolioId: number, name: string, file: Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      const jsonData = this.getCsvData(reader.result as string);
      this.closeDialogWhenLoadingFinished.set(true);
      this.store.dispatch(FilesApiActions.createFile({ createFile: { portfolioId, name, jsonData } }));
    };
    reader.readAsBinaryString(file);
  }

  private getCsvData(data: string): FileJsonData[] {
    const lines = data.split('\n');
    const result: FileJsonData[] = [];
    const headers = lines[0].split(';');
    for (let i = 1; i < lines.length; i++) {
      const obj: FileJsonData = {
        utcTime: '',
        operation: '',
        description: '',
        data: '',
      };
      const currentlines = lines[i].split(';');
      if (currentlines.length === 1) {
        continue;
      }
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j].trim();
        const currentLine = currentlines[j].trim();
        switch (header) {
          case 'UTC_Time':
            obj.utcTime = currentLine;
            break;
          case 'Operation':
            obj.operation = currentLine;
            break;
          case 'Description':
            obj.description = currentLine;
            break;
          case 'Data':
            obj.data = currentLine;
            break;
          default:
            break;
        }
      }
      result.push(obj);
    }

    return result;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

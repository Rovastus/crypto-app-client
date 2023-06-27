import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FileJsonData, ImportFileGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-files-dialog',
  templateUrl: './files-dialog.component.html',
  styleUrls: ['./files-dialog.component.scss'],
})
export class FilesDialogComponent {
  loading = false;
  exportForm: FormGroup;
  portfolioId$: Observable<number>;

  constructor(
    public dialogRef: MatDialogRef<FilesDialogComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private importFileGQL: ImportFileGQL,
    private store: Store<{ portfolioId: number }>,
  ) {
    this.exportForm = this.formBuilder.group({
      nameField: [null, Validators.required],
      fileField: [null, Validators.required],
    });
    this.portfolioId$ = this.store.select('portfolioId');
  }

  createExport(): void {
    if (this.exportForm.valid) {
      this.loading = true;
      this.processCsvData(this.exportForm.value.nameField, this.exportForm.value.fileField);
    }
  }

  processCsvData(exportName: string, file: any) {
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      const json = this.getCsvData(data as string);
      json.sort((a, b) => (a.utcTime < b.utcTime ? -1 : 1));
      this.portfolioId$.pipe(take(1)).subscribe((portfolioId: number) => {
        this.importFileGQL
          .mutate({
            portfolioId,
            name: exportName,
            jsonData: json,
          })
          .subscribe(() => {
            this.loading = true;
            this.snackBar.open('File imported.', 'Close', {
              duration: 5000,
            });
            this.dialogRef.close(true);
          });
      });
    };
    reader.readAsBinaryString(file);
  }

  private getCsvData(data: string): Array<FileJsonData> {
    const lines = data.split('\n');
    const result: Array<FileJsonData> = [];
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

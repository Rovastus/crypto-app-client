import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ImportFileGQL } from 'src/generated/graphql';

interface CsvData {
  UTC_Time: string;
  Account: string;
  Operation: string;
  Coin: string;
  Change: string;
}

@Component({
  selector: 'app-exports-dialog',
  templateUrl: './exports-dialog.component.html',
  styleUrls: ['./exports-dialog.component.css'],
})
export class ExportsDialogComponent implements OnInit {
  loading = false;
  exportForm: FormGroup;
  portpholioId$: Observable<number>;

  constructor(
    public dialogRef: MatDialogRef<ExportsDialogComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private importFileGQL: ImportFileGQL,
    private store: Store<{ portpholioId: number }>
  ) {
    this.exportForm = this.formBuilder.group({
      nameField: [null, Validators.required],
      fileField: [null, Validators.required],
    });
    this.portpholioId$ = this.store.select('portpholioId');
  }

  ngOnInit(): void {}

  createExport(): void {
    if (this.exportForm.valid) {
      this.loading = true;
      this.processCsvData(
        this.exportForm.value.nameField,
        this.exportForm.value.fileField
      );
    }
  }

  processCsvData(exportName: string, file: any) {
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      const json = new Array();
      this.getCsvData(data as string).forEach(
        (element: {
          UTC_Time: string;
          Account: string;
          Operation: string;
          Coin: string;
          Change: string;
        }) => {
          json.push({
            utcTime: element.UTC_Time,
            operation: element.Operation,
            coin: element.Coin,
            change: parseFloat(element.Change),
          });
        }
      );
      json.sort((a, b) => (a.utcTime < b.utcTime ? -1 : 1));
      this.portpholioId$.pipe(take(1)).subscribe((portpholioId: number) => {
        this.importFileGQL
          .mutate({
            portpholioId,
            name: exportName,
            jsonData: json,
          })
          .subscribe(() => {
            this.loading = true;
            this.snackBar.open('Export imported.', 'Close', {
              duration: 5000,
            });
            this.dialogRef.close(true);
          });
      });
    };
    reader.readAsBinaryString(file);
  }

  private getCsvData(data: string): Array<CsvData> {
    const lines = data.split('\n');
    const result: Array<CsvData> = [];
    const headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
      const obj: CsvData = {
        UTC_Time: '',
        Account: '',
        Operation: '',
        Coin: '',
        Change: '',
      };
      const currentline = lines[i].split(',');
      if (currentline.length === 1) {
        continue;
      }
      for (let j = 0; j < headers.length; j++) {
        switch (headers[j]) {
          case 'UTC_Time':
            obj.UTC_Time = currentline[j];
            break;
          case 'Account':
            obj.Account = currentline[j];
            break;
          case 'Operation':
            obj.Operation = currentline[j];
            break;
          case 'Coin':
            obj.Coin = currentline[j];
            break;
          case 'Change':
            obj.Change = currentline[j];
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

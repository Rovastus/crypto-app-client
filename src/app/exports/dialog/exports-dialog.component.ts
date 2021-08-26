import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImportExportGQL } from 'src/generated/graphql';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-exports-dialog',
  templateUrl: './exports-dialog.component.html',
  styleUrls: ['./exports-dialog.component.css'],
})
export class ExportsDialogComponent implements OnInit {
  loading = false;
  exportForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ExportsDialogComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private importExportGQL: ImportExportGQL
  ) {
    this.exportForm = this.formBuilder.group({
      nameField: [null, Validators.required],
      fileField: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  createExport(): void {
    if (this.exportForm.valid) {
      this.loading = true;
      this.processExcelData(
        this.exportForm.value.nameField,
        this.exportForm.value.fileField
      );
    }
  }

  processExcelData(exportName: string, file: any) {
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      const workBook = XLSX.read(data, {
        type: 'binary',
        cellDates: true,
        dateNF: 'yyyy-mm-dd hh:mm:ss',
        cellNF: true,
      });
      const csvData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial['Sheet1'];
      }, {});
      const json = new Array();
      csvData.forEach(
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
      console.log(json);
      this.importExportGQL
        .mutate({
          portpholioId: 8,
          name: exportName,
          jsonData: json,
        })
        .subscribe((res) => {
          this.loading = true;
          this.snackBar.open('Export imported.', 'Close', {
            duration: 5000,
          });
          this.dialogRef.close(true);
        });
    };
    reader.readAsBinaryString(file);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

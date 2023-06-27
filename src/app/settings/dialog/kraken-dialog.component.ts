import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoinPairPriceHistoryKrakenJsonData, ImportCoinPairPriceHistoryKrakenDataGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-kraken-dialog',
  templateUrl: './kraken-dialog.component.html',
  styleUrls: ['./kraken-dialog.component.css'],
})
export class KrakenDialogComponent {
  loading = false;
  krakenForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<KrakenDialogComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private importKrakenCoinPairsGQL: ImportCoinPairPriceHistoryKrakenDataGQL,
  ) {
    this.krakenForm = this.formBuilder.group({
      coinPairField: [null, Validators.required],
      fileField: [null, Validators.required],
    });
  }

  krakenImport(): void {
    if (this.krakenForm.valid) {
      this.loading = true;
      this.processCsvData(this.krakenForm.value.coinPairField, this.krakenForm.value.fileField);
    }
  }

  processCsvData(coinPair: string, file: any) {
    const reader = new FileReader();

    reader.onload = () => {
      this.importKrakenCoinPairsGQL
        .mutate({
          coinPair,
          jsonData: this.getCsvData(reader.result as string),
        })
        .subscribe(() => {
          this.loading = true;
          this.snackBar.open('Coin pair data imported.', 'Close', {
            duration: 5000,
          });
          this.dialogRef.close(true);
        });
    };

    reader.readAsBinaryString(file);
  }

  private getCsvData(data: string): Array<CoinPairPriceHistoryKrakenJsonData> {
    const lines = data.split('\n');
    const result: Array<CoinPairPriceHistoryKrakenJsonData> = [];

    for (let i = 0; i < lines.length; i++) {
      const currentline = lines[i].split(',');
      if (currentline.length === 1) {
        continue;
      }

      result.push({
        utcTimeUnix: parseInt(currentline[0]),
        openPrice: currentline[1],
        closePrice: currentline[4],
      });
    }

    console.log(result);
    return result;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CoinPairApiActions } from 'src/app/store/coin-pair/coin-pair.actions';
import { CoinPairSelectors } from 'src/app/store/coin-pair/coin-pair.selectors';
import { CoinPairPriceHistoryKrakenJsonData } from 'src/generated/graphql';

@Component({
  selector: 'app-kraken-dialog',
  templateUrl: './kraken-dialog.component.html',
  styleUrls: ['./kraken-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KrakenDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<KrakenDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);

  private closeDialogWhenLoadingFinished = signal(false);
  importKrakenCoinPairLoading = this.store.selectSignal(CoinPairSelectors.selectImportKrakenCoinPairLoading);
  private closeDialogRefEffect = effect(() => {
    if (!this.importKrakenCoinPairLoading() && this.closeDialogWhenLoadingFinished()) {
      this.dialogRef.close();
    }
  });

  krakenForm = this.formBuilder.nonNullable.group({
    coinPairField: ['', Validators.required],
    fileField: [null, Validators.required],
  });

  krakenImport(): void {
    if (!this.krakenForm.valid) {
      return;
    }

    const coinPair = this.krakenForm.value.coinPairField;
    const file = this.krakenForm.value.fileField;

    if (!coinPair || !file) {
      return;
    }

    this.processCsvData(coinPair, file);
  }

  private processCsvData(coinPair: string, file: Blob) {
    const reader = new FileReader();

    reader.onload = () => {
      const jsonData = this.getCsvData(reader.result as string);
      this.closeDialogWhenLoadingFinished.set(true);
      this.store.dispatch(CoinPairApiActions.importKrakenCoinPair({ coinPair, jsonData }));
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

    return result;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

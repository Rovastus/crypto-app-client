import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CoinPairApiActions } from '../store/coin-pair/coin-pair.actions';
import { CoinPairSelectors } from '../store/coin-pair/coin-pair.selectors';
import { KrakenDialogComponent } from './dialog/kraken-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);

  initBinanceCoinPairsLoading = this.store.selectSignal(CoinPairSelectors.selectInitBinanceCoinPairsLoading);

  openKrakenDialog(): void {
    this.dialog.open(KrakenDialogComponent, { width: '400px' });
  }

  initBinanceCoinPairs(): void {
    this.store.dispatch(CoinPairApiActions.initBinanceCoinPairs());
  }
}

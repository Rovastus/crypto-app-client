import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KrakenDialogComponent } from './dialog/kraken-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor(private dialog: MatDialog) {}

  openKrakenDialog(): void {
    const dialogRef = this.dialog.open(KrakenDialogComponent, {
      width: '400px',
    });
  }
}

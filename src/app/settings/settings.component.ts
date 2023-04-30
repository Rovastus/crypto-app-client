import { Component } from '@angular/core';
import { KrakenDialogComponent } from './dialog/kraken-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  constructor(private dialog: MatDialog) {}

  openKrakenDialog(): void {
    const dialogRef = this.dialog.open(KrakenDialogComponent, {
      width: '400px',
    });
  }
}

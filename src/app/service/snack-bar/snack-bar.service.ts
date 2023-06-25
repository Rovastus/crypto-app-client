import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) { }

  displayError(message: string) {
    this.openSnackBar(message, 'error-message');
  }

  displayInfo(message: string) {
    this.openSnackBar(message, 'info-message');
  }

  private openSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top', panelClass });
  }
}

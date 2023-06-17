import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class SnackBarService {
	constructor(private snackBar: MatSnackBar) {}

	displayError(message: string) {
		this.snackBar.open(message, 'Close', { duration: 50000, horizontalPosition: 'center', verticalPosition: 'top', panelClass: 'error-message' });
	}
}

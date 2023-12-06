import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  public showError(message: string, duration: number = 5000) : void {
    this.snackbar.open(message, 'DISMISS', {
      verticalPosition: "bottom",
      panelClass: ['snackbar-error'],
      duration: duration
    });
  }

  public showSuccess(message: string, duration: number = 5000) : void {
    this.snackbar.open(message, 'DISMISS', {
      verticalPosition: "bottom",
      panelClass: ['snackbar-success'],
      duration: duration
    });
  }
}

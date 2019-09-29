import { Injectable, NgZone } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';
import { ErrorComponent } from 'src/app/components/error/error.component';
@Injectable({
    providedIn: 'root'
})
export class NotificationService {

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone
    ) { }

  showSuccess(message: string): void {
    // Had an issue with the snackbar being ran outside of angular's zone.
    this.zone.run(() => {
      this.snackBar.open(message);
    });
  }

  showError(){
    this.zone.run(() => {
      this.snackBar.openFromComponent(ErrorComponent);
    });
  }
}
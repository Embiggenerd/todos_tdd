import { Injectable, NgZone } from '@angular/core';
import {
  MatSnackBar,
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
    this.zone.run(() => {
      this.snackBar.open(message);
    });
  }

  showError() {
    this.zone.run(() => {
      this.snackBar.openFromComponent(ErrorComponent);
    });
  }
}
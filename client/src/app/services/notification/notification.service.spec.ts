import { TestBed, ComponentFixture } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing'
import { ErrorComponent } from '../../components/error/error.component'
import { ErrorService } from '../error/error.service'


describe('NotificationService', () => {
  let service: NotificationService
  const errorObj = { error: { name: 'error name', message: 'error message' } }
  let errorService: ErrorService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[
        ErrorComponent
      ],
      imports: [
        OverlayModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        ErrorComponent,
        MatSnackBar,
        NotificationService
      ],
    })

    TestBed.overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [ErrorComponent]}})
    service = TestBed.get(NotificationService);
    errorService = TestBed.get(ErrorService)
    errorService.add(errorObj)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show error', (done) => {
    service.showError()
    const msg = document.querySelector('[data-test-id="error-message"]').textContent
    expect(msg).toContain(errorObj.error.message)
    done()
  })

  it('should show success message', (done) => {
    const msg = 'thing was done successfully'
    service.showSuccess(msg)
    const successMsg = document.querySelector('simple-snack-bar > span').textContent

    expect(successMsg).toContain(msg)
    done()
  })
});

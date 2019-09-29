import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import { ErrorService } from 'src/app/services/error/error.service';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  const errorObj = { error: { name: 'error name', message: 'error message' } }
  let errorService: ErrorService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      providers: [
        ErrorService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    errorService = TestBed.get(ErrorService)
    errorService.add(errorObj)
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the error message', () => {
    const msg = fixture.nativeElement.querySelector('[data-test-id="error-message"]').textContent
    expect(msg).toContain(errorObj.error.message)
  })

  it('should clear eror message', () => {
    const errMsg = component.message
    expect(errMsg).toContain(errorObj.error.message)

    component.clearErrorMessage()

    expect(component.message).not.toContain(errorObj.error.message)
  })
});

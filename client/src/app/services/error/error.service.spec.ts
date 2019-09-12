import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorService } from './error.service';

fdescribe('ErrorService', () => {
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorService,
      ]
    })
  });

  it('should be created', () => {
    const service: ErrorService = TestBed.get(ErrorService);
    expect(service).toBeTruthy();
  });

  it('should add error', () => {
    const expectedError = {name:'hello', message: 'world'}
    const service: ErrorService = TestBed.get(ErrorService);
    
    service.add({error:expectedError})
    
    expect(service.getError()).toBe(expectedError)
  })
  
  it('should clear error', () => {
    const expectedError = {name:'hello', message: 'world'}
    const service: ErrorService = TestBed.get(ErrorService);
    
    service.add({error:expectedError})
    service.clear()

    expect(service.getError()).toBe(undefined)
  })

  it('should get and set server error message', () => {
    const expectedError = {name:'hello', message: 'world'}
    const httpErrorResponse = new HttpErrorResponse({error:expectedError})
    const service: ErrorService = TestBed.get(ErrorService);

    service.setServerErrorMessage(httpErrorResponse)

    expect(service.getServerErrorMessage()).toBe(expectedError.message)
  })
});

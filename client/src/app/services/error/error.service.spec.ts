import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
 
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

  it('should add error', (done) => {
    const expectedError = {name:'hello', message: 'world'}
    const service: ErrorService = TestBed.get(ErrorService);
    
    service.add({error:expectedError})
    
    expect(service.getError()).toBe(expectedError)
    done()
  })
  
  it('should clear error', (done) => {
    const expectedError = {name:'hello', message: 'world'}
    const service: ErrorService = TestBed.get(ErrorService);
    
    service.add({error:expectedError})
    service.clear()

    expect(service.getError()).toBe(null)
    done()
  })

  it('should get and set server error message', (done) => {
    const expectedError = {name:'hello', message: 'world'}
    const httpErrorResponse = new HttpErrorResponse({error:expectedError})
    const service: ErrorService = TestBed.get(ErrorService);

    service.setServerErrorMessage(httpErrorResponse)

    expect(service.getServerErrorMessage()).toBe(expectedError.message)
    done()
  })
});

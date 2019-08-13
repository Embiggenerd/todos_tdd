import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';


import { UserService } from './user.service';
import { LogService } from '../log/log.service'
import { User } from '../../models'

describe('UserService', () => {
  let service: UserService
  let httpClientStub: { get: jasmine.Spy, post:jasmine.Spy };
  let expectedUser: User

  beforeEach(() => {
    httpClientStub = jasmine.createSpyObj('HttpClient', {
      'get': of(expectedUser),
      'post': of(expectedUser)
    });
    service = new UserService(<any>httpClientStub, new LogService());
  });

  it('should be created', () => {

    // const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });


  it('should signup user', () => {
    expectedUser = { id: 42, username: 'Bubba' }

    httpClientStub.post.and.returnValue(of(expectedUser));

    const res = service.signup(expectedUser)

    console.log(res)

    expect(res.subscribe).toEqual(expectedUser)
    
    expect(httpClientStub.post.calls.any()).toBe(true, 'httpclient.post called');

  })
});

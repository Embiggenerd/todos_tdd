import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';


import { UserService } from './user.service';
import { LogService } from '../log/log.service'
import { User } from '../../models'

describe('UserService(no testbed)', () => {
  let service: UserService
  let httpClientStub: { get: jasmine.Spy, post: jasmine.Spy };
  let expectedUser: User
  let retUser: User

  beforeEach(() => {
    httpClientStub = jasmine.createSpyObj('HttpClient', {
      'get': of(expectedUser),
      'post': of(expectedUser)
    });
    service = new UserService(<any>httpClientStub, new LogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should signup user', () => {
    expectedUser = { id: 42, username: 'Bubba' }

    httpClientStub.post.and.returnValue(of(expectedUser));

    const res = service.signup(expectedUser)

    res.subscribe(user => {
      retUser = user
    })

    expect(retUser).toEqual(expectedUser)
    expect(httpClientStub.post.calls.any()).toBe(true, 'httpclient.post called');
  })

  it('Should login user', () => {
    expectedUser = { id: 42, username: 'Bubba' }

    httpClientStub.post.and.returnValue(of(expectedUser));

    const res = service.login(expectedUser)

    res.subscribe(user => {
      retUser = user
    })

    expect(retUser).toEqual(expectedUser)
    expect(httpClientStub.post.calls.any()).toBe(true, 'httpclient.post called');
  })

  it('Successful cookie check authorizes user', () => {
    const authedUser = { authenticated: true }
    let retUser: any

    httpClientStub.get.and.returnValue(of(authedUser));

    expect(service.authAsk()).toBeFalsy()

    const res = service.checkCookie()

    res.subscribe(user => {
      retUser = user
    })

    expect(retUser).toEqual(authedUser)
    expect(service.authAsk()).toBeTruthy()
    expect(httpClientStub.get.calls.any()).toBe(true, 'httpclient.get called');
  })

  it('Unsuccessful cookie check does not authorize user', () => {
    const authedUser = { authenticated: false }
    let retUser: any

    httpClientStub.get.and.returnValue(of(authedUser));

    expect(service.authAsk()).toBeFalsy()

    const res = service.checkCookie()

    res.subscribe(user => {
      retUser = user
    })

    expect(retUser).toEqual(authedUser)
    expect(service.authAsk()).toBeFalsy()
    expect(httpClientStub.get.calls.any()).toBe(true, 'httpclient.get called');
  });
})


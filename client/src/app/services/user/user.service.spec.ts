import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LogService } from '../log/log.service'


import { UserService } from './user.service';

describe('UserService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
      ]
    })
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('Should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('Should signup user', () => {
    inject([HttpTestingController, UserService],
      (httpMock: HttpTestingController, service: UserService) => {
        const expectedUser = {
          username: 'lala',
          id: 24,
          password: 'lala'
        }

        service.signup(expectedUser).subscribe(user => {
          expect(user).toEqual(expectedUser);
        });

        const req = httpMock.expectOne('api/user/signup');

        expect(req.request.method).toEqual('POST');

        req.flush(expectedUser);
      })()
  })

  it('Should login user', () => {
    inject([HttpTestingController, UserService],
      (httpMock: HttpTestingController, service: UserService) => {
        const expectedUser = {
          username: 'lala',
          id: 24,
          password: 'lala'
        }

        service.login(expectedUser).subscribe(user => {
          expect(user).toEqual(expectedUser);
        });

        const req = httpMock.expectOne('api/user/login');

        expect(req.request.method).toEqual('POST');
        req.flush(expectedUser);
      })()
  })

  describe('When cookie is checked, and', () => {
    it('the user is authenticated, user is authorized', () => {
      inject([HttpTestingController, UserService],
        (httpMock: HttpTestingController, service: UserService) => {
          const authedRes = { authenticated: true }

          expect(service.authAsk()).toBeFalsy()

          service.checkCookie().subscribe((res) => {
            expect(res).toBe(authedRes)
            expect(service.authAsk()).toBeTruthy()
          })


          const req = httpMock.expectOne('api/user/auth');

          expect(req.request.method).toEqual('GET');

          req.flush(authedRes)
        })()
    })

    it('the user is unauthenticated, user is not authorized', () => {
      inject([HttpTestingController, UserService],
        (httpMock: HttpTestingController, service: UserService) => {
          const unAuthedRes = { authenticated: false }

          expect(service.authAsk()).toBeFalsy()

          service.checkCookie().subscribe((res) => {
            expect(res).toBe(unAuthedRes)
            expect(service.authAsk()).toBeFalsy()
          })


          const req = httpMock.expectOne('api/user/auth');

          expect(req.request.method).toEqual('GET');

          req.flush(unAuthedRes)
        })()
    })
  })


});

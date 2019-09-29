import { Injectable, APP_INITIALIZER } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'


import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LogService } from '../log/log.service'
import { User, A } from '../../models'

@Injectable({
    providedIn: 'root'
})
export class UserServiceMock {

    isAuthenticated: boolean

    constructor(
        public logService: LogService,
        private mockAuth: boolean
    ) {
        this.init()
        this.mockAuth = mockAuth
    }

    log(message: string) {
        this.logService.add(`UserService: ${message}`)
    }

    http: HttpClient

    signupUrl = 'api/user/signup'

    loginUrl = 'api/user/login'

    authUrl = 'api/user/auth'

    logoutUrl = 'api/user/logout'

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    signup(user: User) {
        // return this.http.post<User>(this.signupUrl, user, this.httpOptions).pipe(
        //   tap((user: User) => this.log(`Signed up new user w/ username=${user.username}`)),
        //   tap((user: User) => console.log('user signedup:', user.id, user.username)),
        // );
        return of({ id: 1, username: 'Ricky' })
    }

    login(user: User) {
        // return this.http.post<User>(this.loginUrl, user, this.httpOptions).pipe(
        //   tap((user: User) => this.log(`Logged in user w/ username=${user.username}`)),
        //   tap((user: User) => console.log('user logged in:', user.id, user.username)),
        // )
        return of({ id: 1, username: 'Ricky' })
    }

    logout() {
        // try {
        //   return this.http.get<any>(this.logoutUrl, this.httpOptions).pipe(
        //     tap(() => this.log('Logged out user')),
        //     tap((res) => console.log('User logged out', res)),
        //   )
        // } catch (e) {
        //   console.log(e)
        // }
        return of({})
    }

    init() {
        this.isAuthenticated = false
    }

    authenticate() {
        this.isAuthenticated = true
    }

    unAuthenticate() {
        this.isAuthenticated = false
    }

    authAsk() {
        return this.isAuthenticated
    }

    // The server checks the cookie and sends back 
    // res.authenticated = boolean
    checkCookie() {
        this.mockAuth ? this.authenticate() : this.unAuthenticate();
        return new Observable<A>()
    }
}

import { Injectable, APP_INITIALIZER } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LogService } from '../log/log.service'
import { User, A } from '../../models'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAuthenticated: boolean

  constructor(
    public http: HttpClient,
    public logService: LogService,
  ) {
    this.init()
  }

  log(message: string) {
    this.logService.add(`UserService: ${message}`)
  }

  signupUrl = 'user/signup'
  loginUrl = 'user/login'
  authUrl = 'user/auth'
  logoutUrl = 'user/logout'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  signup(user: User) {
    return this.http.post<User>(this.signupUrl, user, this.httpOptions).pipe(
      tap((user: User) => this.log(`Signed up new user w/ username=${user.username}`)),
    );
  }

  login(user: User) {
    return this.http.post<User>(this.loginUrl, user, this.httpOptions).pipe(
      tap((user: User) => this.log(`Logged in user w/ username=${user.username}`)),
    )
  }

  logout() {
    try {
      return this.http.get<any>(this.logoutUrl, this.httpOptions).pipe(
        tap(() => this.log('Logged out user')),
      )
    } catch (e) {
      console.log(e)
    }
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
  checkCookie() {
    return this.http.get<A>(this.authUrl, this.httpOptions).pipe(
      tap((res: A) => {
        if (res.authenticated) {
          this.authenticate()
        } else {
          this.unAuthenticate()
        }
      }))
  }
}

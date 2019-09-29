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

  signupUrl = 'api/user/signup'

  loginUrl = 'api/user/login'

  authUrl = 'api/user/auth'

  logoutUrl = 'api/user/logout'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  signup(user: User) {
    return this.http.post<User>(this.signupUrl, user, this.httpOptions).pipe(
      tap((user: User) => this.log(`Signed up new user w/ username=${user.username}`)),
      tap((user: User) => console.log('user signedup:', user.id, user.username)),
    );
  }

  login(user: User) {
    return this.http.post<User>(this.loginUrl, user, this.httpOptions).pipe(
      tap((user: User) => this.log(`Logged in user w/ username=${user.username}`)),
      tap((user: User) => console.log('user logged in:', user.id, user.username)),
    )
  }

  logout() {
    try {
      return this.http.get<any>(this.logoutUrl, this.httpOptions).pipe(
        tap(() => this.log('Logged out user')),
        tap((res) => console.log('User logged out', res)),
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
  // res.authenticated = boolean
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

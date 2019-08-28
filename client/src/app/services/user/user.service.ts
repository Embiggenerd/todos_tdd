import { Injectable, APP_INITIALIZER } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LogService } from '../log/log.service'
import { User } from '../../models'
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isAuthenticated: boolean

  constructor(
    private http: HttpClient,
    private logService: LogService,
    // public errorService: ErrorService
  ) {
    this.init()
  }

  private log(message: string) {
    this.logService.add(`UserService: ${message}`)
  }

  private signupUrl = 'api/user/signup'

  private loginUrl = 'api/user/login'


  private httpOptions = {
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
      tap((user: User) => this.log(`Signed up new user w/ username=${user.username}`)),
      tap((user: User) => console.log('user signedup:', user.id, user.username)),
    )
  }

  init() {
    this.isAuthenticated = false
  }

  authenticate(){
    this.isAuthenticated = true
  }

  unAuthenticate(){
    this.isAuthenticated = false
  }

  authAsk(){
    return this.isAuthenticated
  }


}

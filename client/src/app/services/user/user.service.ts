import { Injectable, APP_INITIALIZER } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LogService } from '../log/log.service'
import { User } from '../../models'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  isAuthenticated: boolean

  constructor(
    private http: HttpClient, 
    private logService: LogService,
    ) {
      this.init()
     }

  private log(message: string) {
    this.logService.add(`UserService: ${message}`)
  }

  private userUrl = '/user'

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: Error): Observable<T> => {
  //     console.log(error)
  //     // Send error to log service, which talks to backend
  //     this.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  // signup(user: User){
  //   console.log(user)
  //   return this.http.post<User>(this.userUrl, user, this.httpOptions).pipe(
  //     tap((user: User) => this.log(`Signed up new user w/ username=${user.name}`)),
  //     tap((user:User ) => console.log('user signedup:', user.id, user.name)),
  //     catchError(this.handleError)
  //   );
  // }

  signup(user: User){
    console.log(user)
    return this.http.post<User>('api/user/signup', user, this.httpOptions)
  }

  init(){
    this.isAuthenticated = false
  }
}

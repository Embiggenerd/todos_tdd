import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LogService } from '../log/log.service'
import { Todo } from '../../models'
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(
    private http: HttpClient,
    private logService: LogService,
    private userService: UserService
  ) { }

  private log(message: string) {
    this.logService.add(`Todosservice: ${message}`)
  }

  todos: Todo[]

  private todoUrl = 'api/todos/get'

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {

      // Send error to log service, which talks to backend
      this.log(`${operation} failed: ${error.message}`);

      // Unauthentiate user if error is 401 
      if (error.status === 401) {
        this.userService.unAuthenticate()
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl, this.httpOptions).pipe(
      tap((todos: Todo[]) => this.log(`Fetched todos, todos=${JSON.stringify(todos)}`)),
      tap((todos: Todo[]) => this.todos = todos),
      tap((todos: Todo[]) => { if (todos) { this.userService.authAsk() === true } }),
      tap(_ => console.log('todosService.todos', this.todos)),
      catchError(this.handleError<Todo[]>('Get Todos'))
    )
  }
}

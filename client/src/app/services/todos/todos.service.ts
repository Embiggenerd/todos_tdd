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
  ) { }

  private log(message: string) {
    this.logService.add(`Todosservice: ${message}`)
  }

  todos: Todo[] = []

  private getTodoURL = 'api/todos/get'
  private postTodoURL = 'api/todos/submit'
  private toggleCloseURL = 'api/todos/toggleClosed'
  private deleteTodoURL = 'api/todos/deleteTodo'

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: HttpErrorResponse): Observable<T> => {

  //     // Send error to log service, which talks to backend
  //     this.log(`${operation} failed: ${error.message}`);

  //     // Unauthentiate user if error is 401 
  //     if (error.status === 401) {
  //       this.userService.unAuthenticate()
  //     }

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
  add(todos: Todo[] | Todo):void {
    if (Array.isArray(todos)) {
      this.todos = todos
    } else {
      this.todos.push(todos)
    }
  }

  toggleClosed(todo: Todo):void {
    const i: number = this.todos.findIndex(item => item._id === todo._id)
    this.todos[i].closed = todo.closed
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.getTodoURL, this.httpOptions).pipe(
      tap((todos: Todo[]) => this.log(`Fetched todos, todos=${JSON.stringify(todos)}`)),
      tap((todos: Todo[]) => this.add(todos))
    )
  }

  postTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.postTodoURL, todo, this.httpOptions).pipe(
      tap((todo: Todo) => this.log(`Submitted todo, todo=${JSON.stringify(todo)}`)),
      tap((todo: Todo) => this.add(todo)),
      tap(()=> {
        console.log('postTodoz')
      })
    )
  }

  postToggleClosed(todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(this.toggleCloseURL, todo, this.httpOptions).pipe(
      tap((todo: Todo) => this.log(`Toggled close on todo, todo=${JSON.stringify(todo)}`)),
      // tap((todo: Todo) => this.toggleClosed(todo))
    )
  }

  postDeleteTodo(todo:Todo){
    return this.http.post<Todo>(this.deleteTodoURL, todo, this.httpOptions).pipe(
      tap((todo: Todo) => this.log(`Submitted todo, todo=${JSON.stringify(todo)}`)),
      // tap((todo:Todo) => this.deleteTodo(todo))
    )
  }

  getTodo(id: string): Observable<Todo> {
    console.log('getTodoz',this.todos, id, this.todos.filter(todo => todo._id == id))
    return of(this.todos.filter(todo => todo._id == id)[0])
  }
}

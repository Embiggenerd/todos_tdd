import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LogService } from '../log/log.service'
import { Todo } from '../../models'


@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(
    private http: HttpClient,
    private logService: LogService,
  ) {
    this.setTodos()
  }

  private log(message: string) {
    this.logService.add(`Todosservice: ${message}`)
  }

  private _todos: BehaviorSubject<Todo[]> = new BehaviorSubject([]);

  public readonly todos: Observable<Todo[]> = this._todos.asObservable();

  getTodosURL = 'api/todos/get'
  postTodoURL = 'api/todos/submit'
  toggleCloseURL = 'api/todos/toggleClosed'
  deleteTodoURL = 'api/todos/deleteTodo'

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.getTodosURL, this.httpOptions).pipe(
      tap((todos: Todo[]) => this.log(`Fetched todos, todos=${JSON.stringify(todos)}`))
    )
  }

  setTodos(): void {
    this.getTodos().subscribe((todos: Todo[]) => {
      this._todos.next(todos);
    })
  }

  postTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.postTodoURL, todo, this.httpOptions).pipe(
      tap((todo: Todo) => this.log(`Submitted todo, todo=${JSON.stringify(todo)}`)),
    )
  }

  addTodo(todo: Todo): void {
    this.postTodo(todo).subscribe(todo => {
      const oldTodos = this._todos.getValue()
      this._todos.next([...oldTodos, todo])
    })
  }

  postToggleClosed(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.toggleCloseURL, todo, this.httpOptions).pipe(
      tap((todo: Todo) => this.log(`Toggled close on todo, todo=${JSON.stringify(todo)}`)),
    )
  }

  toggleClosed(todo: Todo) {
    this.postToggleClosed(todo).subscribe((todo: Todo) => {
      const oldTodos = this._todos.getValue()
      const i: number = oldTodos.findIndex(item => item._id === todo._id)
      oldTodos[i].closed = todo.closed
      this._todos.next(oldTodos)
    })
  }

  postDeleteTodo(todo: Todo) {
    return this.http.post<Todo>(this.deleteTodoURL, todo, this.httpOptions).pipe(
      tap((todo: Todo) => this.log(`Submitted todo, todo=${JSON.stringify(todo)}`)),
    )
  }

  getTodo(id: string): Observable<Todo> {
    const oldTodos = this._todos.getValue()
    oldTodos.filter(todo => todo._id == id)
    return of(oldTodos.filter(todo => todo._id == id)[0])
  }

  deleteTodo(todo) {
    this.postDeleteTodo(todo).subscribe(todo => {
      const oldTodos = this._todos.getValue()
      const newTodos = oldTodos.filter(item => item._id !== todo._id)
      this._todos.next(newTodos)
    })
  }
}

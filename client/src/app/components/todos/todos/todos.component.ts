import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos/todos.service';

import { Todo } from '../../../models'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.sass']
})
export class TodosComponent implements OnInit {
  // import todos service, call get todos, display todos

  todos: Todo[] = []

  constructor(
    private todosService: TodosService
  ) { }

  ngOnInit() {
    this.getTodos()
  }

  getTodos() {
    this.todosService.getTodos().subscribe((todos: Todo[]) => {
      this.todos = todos
    })
  }

  deleteTodo(todoToDelete: Todo) {
    this.todosService.postDeleteTodo(todoToDelete).subscribe((todo) => {
      console.log('deleteTodoz', todo)
      this.todos = this.todos.filter(item => item._id != todo._id)
    })
  }

  toggleClosed(todo: Todo): void {
    this.todosService.postToggleClosed(todo).subscribe((todo: Todo) => {
      const i: number = this.todos.findIndex(item => item._id === todo._id)
      this.todos[i].closed = todo.closed
    })
  }
}

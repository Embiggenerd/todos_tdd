import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos/todos.service';

import { Todo } from '../../../models'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.sass']
})
export class TodosComponent implements OnInit {

  constructor(
    public todosService: TodosService
  ) { }

  ngOnInit() {
  }

  deleteTodo(todoToDelete: Todo) {
    this.todosService.deleteTodo(todoToDelete)
  }

  toggleClosed(todo: Todo): void {
    this.todosService.toggleClosed(todo)
  }

  postTodo(todo: string): void {
    const Todo = {
      todo,
      user: '',
      closed: false
    }
    this.todosService.addTodo(Todo)
  }
}

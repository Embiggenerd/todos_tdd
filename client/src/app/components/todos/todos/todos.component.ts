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

  constructor(
    private todosService: TodosService
  ) { }

  ngOnInit() {
    this.getTodos()
  }

  getTodos(){
    console.log('gettodos in todos component called')
    this.todosService.getTodos().subscribe((todos:Todo[]) => {
    })
  } 
}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, } from '@angular/common';

import { Todo } from '../../../models'
import { TodosService } from '../../../services/todos/todos.service'

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.sass']
})
export class TodoDetailComponent implements OnInit {

  todo: Todo
  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getTodo()
  }

  getTodo(): void {
    const id = this.route.snapshot.params.id
    this.todosService.getTodo(id.toString())
      .subscribe(todo => {
        this.todo = Object.assign({}, todo)
      });
  }

  goBack(): void {
    console.log('goBack invoked')
    this.location.back();
  }

  save(): void {
    this.todosService.updateTodo(this.todo)
    this.goBack()
  }
}

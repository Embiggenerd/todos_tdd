import { Component } from '@angular/core';
import { TodosService } from './services/todos/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'todos-tdd';
  todos: TodosService

  constructor(private todosService: TodosService){}

  ngOnInit(){
    this.getTodos()
  }

  getTodos(){
    this.todosService.getTodos()
  }
}

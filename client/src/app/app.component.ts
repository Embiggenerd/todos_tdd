import { Component } from '@angular/core';
import { TodosService } from './services/todos/todos.service';
import { Todo } from './models'
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'todos-tdd';
  todos: TodosService

  constructor(private todosService: TodosService, private userService: UserService){}

  ngOnInit(){
    console.log('authenticatedz:', this.userService.authAsk())
    this.checkCookie()
    console.log('authenticatedz2:', this.userService.authAsk())
  }

  // getTodos(){
  //   this.todosService.getTodos().subscribe((todos: Todo[]) => {
  //     this.userService.authenticate()
  //     console.log('got todos:', todos)
  //     console.log('user is authenticated:', this.userService.authAsk())

  //   })
  // }

  checkCookie(){
    this.userService.checkCookie().subscribe(()=>{
      console.log('user is authenticated:', this.userService.authAsk())
    })
  }
}

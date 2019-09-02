import { Component } from '@angular/core';
import { TodosService } from './services/todos/todos.service';
import { Todo } from './models'
import { UserService } from './services/user/user.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'todos-tdd';
  todos: TodosService

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
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

  checkCookie() {
    this.userService.checkCookie().subscribe(() => {
      const isAuthed = this.userService.authAsk()
      console.log('user is authenticated:', isAuthed)

      if (isAuthed) {
        this.goToTodos()
      } else {
        this.goToSignup()
      }

    })
  }

  goToTodos() {
    this.router.navigate(['/todos'])
  }

  goToSignup() {
    this.router.navigate(['/signup'])
  }
}

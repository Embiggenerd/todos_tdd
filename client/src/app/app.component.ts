import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'todos-tdd';

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log('authenticatedz:', this.userService.authAsk())
    this.checkCookie()
    console.log('authenticatedz2:', this.userService.authAsk())
  }

  logout(){
    console.log('app.logout 1')
    this.userService.logout().subscribe((res) => {
      this.userService.unAuthenticate()
      this.goToSignup()
      console.log('logoutres', res)
    })
    console.log('app.logout 2')
  }
 
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

  userIsAuthed(){
    return this.userService.authAsk()
  }
}

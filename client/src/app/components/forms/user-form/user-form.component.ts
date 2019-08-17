import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../../models'
import { ErrorService } from 'src/app/services/error/error.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass']
})
export class UserForm implements OnInit {

  // whichForm: string

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  signup(username: string, password: string): void {
    const user = { username, password }
    this.userService.signup(user).subscribe((user: User) => console.log(user))

  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../../models'

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }
  from '@angular/forms';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass']
})
export class UserForm implements OnInit {
  form: FormGroup;

  userName = new FormControl("", Validators.required);

  whichForm = 'signup'

  loginStatement = 'Please log in with your username and password'

  signupStatement = 'Please signup with a unique username and password (passwords are never stored in plain text)'

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      "userName": this.userName,
      "password": ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(event: Event) {
    event.preventDefault()
    this.sendUserReq(this.form.value.userName, this.form.value.password)
    this.reset()
  }

  reset() {
    this.form.reset();
  }

  sendUserReq(username: string, password: string): void {
    if (this.whichForm === 'login') {
      this.login(username, password)
      return
    }
    this.signup(username, password)
  }

  signup(username: string, password: string): void {
    const user = { username, password }

    this.userService.signup(user).subscribe((user: User) => {
      this.toggleForm()
      console.log('signed up:', user)
    })
  }

  login(username: string, password: string): void {
    const user = { username, password }

    this.userService.login(user).subscribe((user: User) => {
      this.goToTodos()
      this.userService.authenticate()
      console.log('loggged in:', user)
    })
  }

  // Toggles which form we display, which also determines other things
  toggleForm() {
    if (this.whichForm === 'signup') {
      this.whichForm = 'login'
    } else {
      this.whichForm = 'signup'
    }
  }

  getBtnText(): string {
    return this.whichForm === 'login' ? 'Log in' : 'Sign up'
  }

  goToTodos() {
    this.router.navigate(['/todos'])
  }
}

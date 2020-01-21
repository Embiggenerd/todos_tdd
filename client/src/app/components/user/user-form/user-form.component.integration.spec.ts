import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { internet } from 'faker'

import { Router } from '@angular/router'

import { UserForm } from './user-form.component';
import { UserService } from '../../../services/user/user.service'
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

function createNewEvent(eventName) {
  if (typeof (Event) === 'function') {
    // not IE
    return new Event(eventName);
  } else {
    // IE
    const event = document.createEvent('Event');
    event.initEvent(eventName, true, true);

    return event;
  }
}

/**
 * Here, we manipulate a dom representation of our app, and we
 * check for actual values from that dom representation as well
 */

describe('UserFormComponent', () => {
  let component: UserForm;
  let fixture: ComponentFixture<UserForm>;
  let backend: HttpTestingController
  let router: RouterTestingModule
  let userService: UserService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [UserForm],
      providers: [
        UserService,
        { provide: Router, useValue: RouterTestingModule.withRoutes([]), }
      ]
    })
      .compileComponents();

    backend = TestBed.get(HttpTestingController)
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(UserForm);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService)
    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should switch forms when toggle forms button is clicked', () => {

    const toggleFormBtn = fixture
      .nativeElement
      .querySelector('[data-test-id="toggle-user-form-btn"]')
    const userSubmitBtn = fixture
      .nativeElement
      .querySelector('[data-test-id="user-submit-button"]')

    const event = createNewEvent('click')

    expect(userSubmitBtn.innerText).toBe('Sign up')

    toggleFormBtn.dispatchEvent(event)
    fixture.detectChanges()

    expect(userSubmitBtn.innerText).toBe('Log in')
  })

  it('should reset fields and make post request to signup end point on submit', () => {

    const userName = internet.userName()
    const password = internet.password()

    const inputUserName = fixture.nativeElement
      .querySelector('[data-test-id="username-input"]')
    const inputPassword = fixture.nativeElement
      .querySelector('[data-test-id="password-input"]')
    const userForm = fixture.nativeElement
      .querySelector('[data-test-id="user-form"]')

    const inputEvent = createNewEvent('input')
    const submitEvent = createNewEvent('submit')

    inputUserName.value = userName
    inputPassword.value = password

    expect(inputUserName.value).toBe(userName)
    expect(inputPassword.value).toBe(password)

    inputPassword.dispatchEvent(inputEvent)
    inputUserName.dispatchEvent(inputEvent)

    userForm.dispatchEvent(submitEvent)

    fixture.detectChanges()

    const req = backend.expectOne('user/signup')

    expect(inputUserName.value).toBe('')
    expect(inputPassword.value).toBe('')
    expect(req.request.method).toEqual('POST')
  })

  it('after signup, login form is displayed, and clicking submit successfully logs user in', () => {
    const userName = internet.userName()
    const password = internet.password()
    const userID = 32

    const inputUserName = fixture.nativeElement
      .querySelector('[data-test-id="username-input"]')
    const inputPassword = fixture.nativeElement
      .querySelector('[data-test-id="password-input"]')
    const userForm = fixture.nativeElement
      .querySelector('[data-test-id="user-form"]')
    const userSubmitBtn = fixture.nativeElement
      .querySelector('[data-test-id="user-submit-button"]')

    const inputEvent = createNewEvent('input')
    const submitEvent = createNewEvent('submit')

    inputUserName.value = userName
    inputPassword.value = password

    expect(inputUserName.value).toBe(userName)
    expect(inputPassword.value).toBe(password)


    inputPassword.dispatchEvent(inputEvent)
    inputUserName.dispatchEvent(inputEvent)
    fixture.detectChanges()

    userForm.dispatchEvent(submitEvent)

    userService.signup({ username: userName, id: userID }).subscribe(user => {

    })

    const signupReq = backend.match((request) => {
      return request.url === 'user/signup' &&
        request.method === "POST"
    })


    signupReq[0].flush(of({ username: userName, id: userID }))
    fixture.detectChanges()


    expect(inputUserName.value).toBe('')
    expect(inputPassword.value).toBe('')
    expect(userSubmitBtn.innerText).toBe('Log in')
  })

  it('logging makes login api call', () => {

    const userName = internet.userName()
    const password = internet.password()

    const inputUserName = fixture.nativeElement
      .querySelector('[data-test-id="username-input"]')
    const inputPassword = fixture.nativeElement
      .querySelector('[data-test-id="password-input"]')
    const userForm = fixture.nativeElement
      .querySelector('[data-test-id="user-form"]')
    const userSubmitBtn = fixture.nativeElement
      .querySelector('[data-test-id="user-submit-button"]')
    const toggleFormBtn = fixture.nativeElement
      .querySelector('[data-test-id="toggle-user-form-btn"]')

    const inputEvent = createNewEvent('input')
    const submitEvent = createNewEvent('submit')
    const clickEvent = createNewEvent('click')

    inputUserName.value = userName
    inputPassword.value = password

    expect(inputUserName.value).toBe(userName)
    expect(inputPassword.value).toBe(password)

    toggleFormBtn.dispatchEvent(clickEvent)
    fixture.detectChanges()

    inputPassword.dispatchEvent(inputEvent)
    inputUserName.dispatchEvent(inputEvent)
    fixture.detectChanges()

    userForm.dispatchEvent(submitEvent)

    const loginReq = backend.match((request) => {
      return request.url === 'user/login' &&
        request.method === "POST"
    })

    fixture.detectChanges()
    expect(loginReq.length).toBe(1)
  })
});

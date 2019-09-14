import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { internet } from 'faker'

import { Router } from '@angular/router'

import { UserForm } from './user-form.component';
import { UserService } from '../../../services/user/user.service'
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

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
 * In this set of tests, we check for actual values programmtically,
 * such as a public property of a class, instead of by dom element innertext.
 */

describe('UserFormComponent', () => {
  let component: UserForm;
  let fixture: ComponentFixture<UserForm>;
  let userServiceStub: Partial<UserService>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [UserForm],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Router, useValue: RouterTestingModule, }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should process user input', () => {

    const userName = internet.userName()
    const password = internet.password()

    const inputUserName = fixture.nativeElement
      .querySelector('[data-test-id="username-input"]')
    const inputPassword = fixture.nativeElement
      .querySelector('[data-test-id="password-input"]')

    const event = createNewEvent('input')

    inputUserName.value = userName
    inputPassword.value = password

    inputPassword.dispatchEvent(event)
    inputUserName.dispatchEvent(event)

    fixture.detectChanges()

    expect(component.form.value.userName).toBe(userName)
    expect(component.form.value.password).toBe(password)
  })

  it('should switch forms when toggle forms button is clicked', () => {

    const toggleFormBtn = fixture
      .nativeElement
      .querySelector('[data-test-id="toggle-user-form-btn"]')
    const event = createNewEvent('click')

    expect(component.whichForm).toBe('signup')

    toggleFormBtn.dispatchEvent(event)
    fixture.detectChanges()

    expect(component.whichForm).toBe('login')
  })

  it('should reset username and password fields after submit', () => {

    const userName = internet.userName()
    const password = internet.password()

    const inputUserName = fixture.nativeElement
      .querySelector('[data-test-id="username-input"]')
    const inputPassword = fixture.nativeElement
      .querySelector('[data-test-id="password-input"]')
    
    const inputEvent = createNewEvent('input')

    inputUserName.value = userName
    inputPassword.value = password

    inputPassword.dispatchEvent(inputEvent)
    inputUserName.dispatchEvent(inputEvent)

    expect(component.form.value.userName).toBe(userName)
    expect(component.form.value.password).toBe(password)

    component.reset()
    fixture.detectChanges()

    expect(component.form.value.userName).toBe(null)
    expect(component.form.value.password).toBe(null)
  })
});

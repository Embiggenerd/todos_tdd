import { TestBed, async, ComponentFixture, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { UserService } from './services/user/user.service';
import { ReactiveFormsModule } from '@angular/forms';

import { routes } from './app-routing.module'
import { TodosComponent } from './components/todos/todos/todos.component'
import { UserForm } from './components/forms/user-form/user-form.component'
import { Router } from '@angular/router';

describe('AppComponent', () => {
  var router2 = {
    navigate: jasmine.createSpy('navigate')
  }
  
  let httpTestingController: HttpTestingController
  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        TodosComponent,
        UserForm
      ],
      providers: [
        UserService,
        { provide: Router, useValue: router2 }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // appComponent = TestBed.get(AppComponent)
    fixture.detectChanges();
    // router = TestBed.get(Router)
    // location = TestBed.get(Location);

    httpTestingController = TestBed.get(HttpTestingController)
    // router.initialNavigation()
  })


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todos-tdd'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('todos-tdd');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to todos-tdd!');
  });

  it('should check cookie on init', () => {
    const req = httpTestingController.expectOne('api/user/auth')
    expect(req.request.method).toEqual('GET');
    req.flush({});
  })

  it('should go to todos if user is authenticated', () => {
    const userService = TestBed.get(UserService)
    userService.authenticate()

    fixture.detectChanges()

    component.checkCookie()

    fixture.detectChanges()
    expect(router2.navigate).toHaveBeenCalledWith(['/todos'])
  })

  it('should logout user', () => {
    component.logout()
    const req = httpTestingController.expectOne('api/user/logout')
    expect(req.request.method).toEqual('GET');
    req.flush({});
  })

  it('should go to todos url', () => {
    component.goToTodos()
    expect(router2.navigate).toHaveBeenCalledWith(['/todos']);
  })

  it('should go to signup url', () => {
    component.goToSignup()
    expect(router2.navigate).toHaveBeenCalledWith(['/signup']);
  })

  it('should as if user is authed', () => {
    expect(component.userIsAuthed()).toBe(false)
  })
});

import { TestBed, async, ComponentFixture, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { UserService } from './services/user/user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { routes } from './app-routing.module'
import { TodosComponent } from './components/todos/todos/todos.component'
import { UserForm } from './components/user/user-form/user-form.component'
import { TodoDetailComponent } from './components/todos/todo-detail/todo-detail.component'
import { TodosForm } from './components/todos/todos-form/todos-form.component';

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
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        TodosComponent,
        UserForm,
        TodoDetailComponent,
        TodosForm
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
    fixture.detectChanges();
    httpTestingController = TestBed.get(HttpTestingController)
  })

  it('should create the app', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    done()
  });

  it(`should have as title 'todos-tdd'`, (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('todos-tdd');
    done()
  });

  it('should render title in a h1 tag', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to todos-tdd!');
    done()
  });

  it('should check cookie on init', (done) => {
    const req = httpTestingController.expectOne('user/auth')
    expect(req.request.method).toEqual('GET');
    req.flush({});
    done()
  })

  it('should logout user', (done) => {
    component.logout()
    const req = httpTestingController.expectOne('user/logout')
    expect(req.request.method).toEqual('GET');
    req.flush({});
    done()
  })

  it('should go to todos url', (done) => {
    component.goToTodos()
    expect(router2.navigate).toHaveBeenCalledWith(['/todos']);
    done()
  })

  it('should go to signup url', (done) => {
    component.goToSignup()
    expect(router2.navigate).toHaveBeenCalledWith(['/signup']);
    done()
  })

  it('should ask if user is authed', (done) => {
    expect(component.userIsAuthed()).toBe(false)
    done()
  })
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { of } from 'rxjs'

import { TodosComponent } from './todos.component';
import { TodosForm } from '../../todos/todos-form/todos-form.component'
import { TodoDetailComponent } from '../../todos/todo-detail/todo-detail.component'
import { internet } from 'faker'
import { TodosService } from '../../../services/todos/todos.service'

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

describe('TodosComponent', () => {

  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let backend: HttpTestingController
  let service: TodosService
  let mockService: any
  const mockTodo = {
    todo: 'eat birds',
    _id: '2',
    closed: false,
    user: 'babbles'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodosComponent,
        TodosForm,
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        TodosService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(HttpTestingController)
    service = TestBed.get(TodosService)
    mockService = jasmine.createSpyObj('TodosService',
      {
        'todos': of([mockTodo]),
        'addTodo': () => { },
        'toggleClosed': () => { },
        'deleteTodo': () => { }
      });
  });

  it('should create', (done) => {
    const mockService = jasmine.createSpyObj('TodosService',
      {
        'todos': of([mockTodo]),
        'addTodo': () => { },
        'toggleClosed': () => { },
        'deleteTodo': () => { }
      });
    expect(component).toBeTruthy();
    done()
  });

  it('should get todos on init', (done) => {
    const req = backend.expectOne('api/todos/get')
    expect(req.request.method).toEqual('GET')
    backend.verify()
    done()
  })

  it('displays todos it receives', (done) => {
    const req = backend.expectOne('api/todos/get')
    req.flush([mockTodo])

    fixture.detectChanges()
    const todosList = fixture.nativeElement
      .querySelector('[data-test-id="todos-list"]')
    expect(todosList.innerText).toContain('eat birds')
    done()
  })

  it('deletes todo', (done) => {
    const getReq = backend.expectOne('api/todos/get')
    getReq.flush([mockTodo])

    fixture.detectChanges()

    const deleteBtn = fixture.nativeElement.querySelector(['[data-test-id="delete-todo-btn"]'])
    const clickEvent = createNewEvent('click')
    deleteBtn.dispatchEvent(clickEvent)

    const postReq = backend.expectOne('api/todos/deleteTodo')
    postReq.flush(mockTodo)
    backend.verify()
    done()
  })

  it('toggles closed property', (done) => {
    const getReq = backend.expectOne('api/todos/get')
    getReq.flush([mockTodo])

    fixture.detectChanges()

    const toggleBtn = fixture.nativeElement.querySelector(['[data-test-id="toggle-closed-btn"]'])
    const clickEvent = createNewEvent('click')
    toggleBtn.dispatchEvent(clickEvent)

    const toggleReq = backend.expectOne(service.toggleCloseURL)
    toggleReq.flush(mockTodo)
    backend.verify()
    done()
  })
});

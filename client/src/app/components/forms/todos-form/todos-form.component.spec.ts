import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { lorem, internet } from 'faker'

import { TodosForm } from './todos-form.component';
import { ReactiveFormsModule } from '@angular/forms';
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

describe('TodosFormComponent', () => {
  let component: TodosForm;
  let fixture: ComponentFixture<TodosForm>;
  let todosServiceStub: Partial<TodosService>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TodosForm],
      providers: [
        { provide: TodosService, useValue: todosServiceStub },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodosForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should process todos input', () => {
    const todo = lorem.words()

    const inputTodos = fixture.nativeElement
      .querySelector('[data-test-id="todo-input"]')

    const event = createNewEvent('input')

    inputTodos.value = todo
    inputTodos.dispatchEvent(event)

    fixture.detectChanges()

    expect(component.form.value.todo).toBe(todo)
  })

  it('should clear todo input field', () => {
    const todo = lorem.words()

    const inputTodos = fixture.nativeElement
      .querySelector('[data-test-id="todo-input"]')

    const event = createNewEvent('input')

    inputTodos.value = todo
    inputTodos.dispatchEvent(event)

    fixture.detectChanges()

    expect(component.form.value.todo).toBe(todo)

    component.reset()
    fixture.detectChanges()

    expect(component.form.value.todo).toBe(null)
  })
});

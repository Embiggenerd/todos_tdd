import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { internet, lorem } from 'faker'

import { Router } from '@angular/router'

import { TodosForm } from './todos-form.component';
import { UserService } from '../../../services/user/user.service'
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { TodosService } from 'src/app/services/todos/todos.service';

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
    let component: TodosForm
    let fixture: ComponentFixture<TodosForm>
    let backend: HttpTestingController
    let router: RouterTestingModule
    let todosService: TodosService

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, HttpClientTestingModule],
            declarations: [TodosForm],
            providers: [
                TodosService,
                { provide: Router, useValue: RouterTestingModule.withRoutes([]), }
            ]
        })
            .compileComponents()

        backend = TestBed.get(HttpTestingController)
        router = TestBed.get(Router);
        fixture = TestBed.createComponent(TodosForm);
        component = fixture.componentInstance;
        todosService = TestBed.get(UserService)
        fixture.detectChanges();

    }))

    it('should create', () => {
        expect(component).toBeTruthy();
    })

    it('should make post request to submit endpoint on submit', () => {
        
        const todo = lorem.words()

        const inputTodo = fixture.nativeElement
            .querySelector('[data-test-id="todo-input"]')
        const todoForm = fixture.nativeElement
            .querySelector('[data-test-id="todo-form"]')
        
        const inputEvent = createNewEvent('input')
        const submitEvent = createNewEvent('submit')

        inputTodo.value = todo

        expect(inputTodo.value).toBe(todo)

        inputTodo.dispatchEvent(inputEvent)
        todoForm.dispatchEvent(submitEvent)

        fixture.detectChanges()

        const req = backend.expectOne('api/todos/submit')

        expect(inputTodo.value).toBe('')
        expect(req.request.method).toEqual('POST')
    })

    // it('should emit submitted todo', () => {
    //     const todoText = lorem.words()
    //     let actualTodo

    //     // component.outputTodo({todo:todoText, user: lorem.word(), closed: false})
    //     // fixture.detectChanges()
    //     component.newTodoEvent.subscribe(emitedTodo => {
    //         actualTodo = emitedTodo     
    //     })
    //     fixture.detectChanges()

    //     expect(actualTodo.todo).toEqual(todoText)
    // })
})
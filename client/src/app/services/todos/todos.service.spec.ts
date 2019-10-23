import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Todo } from '../../models'

import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService
  let httpMock: HttpTestingController

  const mockTodos: Todo[] = [
    {
      closed: false,
      todo: 'buy milk',
      user: 'igor',
      _id: '1'
    },
    {
      closed: false,
      todo: 'train elephants',
      user: 'igor',
      _id: '2'
    }
  ]

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        TodosService
      ]
    })

    service = TestBed.get(TodosService)
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get and add todos', (done) => {

    const mockReq = httpMock.expectOne(service.getTodosURL);

    mockReq.flush(mockTodos)
    httpMock.verify();
    service.todos.subscribe(todos => expect(todos).toEqual(mockTodos))
    done()
  })


  it('should post and add todo', (done) => {
    const mockTodo: Todo = {
      closed: false,
      todo: 'get fit',
      user: 'igor'
    }
    service.addTodo(mockTodo)

    const req = httpMock.expectOne(service.postTodoURL);
    expect(req.request.method).toEqual('POST');
    req.flush(mockTodo);

    service.todos.subscribe(todos => expect(todos[0]).toEqual(mockTodo))
    done()
  })

  it('should toggle todo', (done) => {

    const postToggleTodo = {
      closed: true,
      todo: 'buy milk',
      user: 'igor',
      _id: '1'
    }

    const reqGet = httpMock.expectOne(service.getTodosURL);
    expect(reqGet.request.method).toEqual('GET');
    reqGet.flush(mockTodos);

    service.toggleClosed(postToggleTodo)

    const reqPost = httpMock.expectOne(service.toggleCloseURL);

    reqPost.flush(postToggleTodo)
    service.todos.subscribe(todos => expect(todos[0].closed).toBe(true))
    done()
  })

  it('should delete todo', (done) => {

    const todoToDelete: Todo = {
      closed: false,
      todo: 'train elephants',
      user: 'igor',
      _id: '2'
    }

    const reqGet = httpMock.expectOne(service.getTodosURL);
    expect(reqGet.request.method).toEqual('GET');
    reqGet.flush(mockTodos);

    service.deleteTodo(todoToDelete)

    const reqDel = httpMock.expectOne(service.deleteTodoURL);

    reqDel.flush(todoToDelete)
    service.todos.subscribe(todos => expect(todos.length).toBe(1))
    done()
  })

  it('should get todo by id', (done) => {
    const reqGet = httpMock.expectOne(service.getTodosURL);
    expect(reqGet.request.method).toEqual('GET');
    reqGet.flush(mockTodos);

    service.getTodo('1').subscribe(todo => expect(todo).toEqual(mockTodos[0]))
    done()
  } )
})
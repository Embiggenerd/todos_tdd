import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Todo } from '../../models'

import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService
  let httpTestingController: HttpTestingController

  const todos:Todo[] = [
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

      ]
    })

    service = TestBed.get(TodosService)
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add todos', () => {

    service.add(todos)
    expect(service.todos).toEqual(todos)
  })

  it('should get todos', () => {

    service.getTodos().subscribe(todosRet => {
      expect(todosRet).toEqual(todos)
    })
    const req = httpTestingController.expectOne('api/todos/get');
    expect(req.request.method).toEqual('GET');
    req.flush(todos);
    expect(service.todos).toEqual(todos)
  })

  it('should post todo', (done) => {
    const expectedRes = {
      closed: false,
      todo: 'get fit',
      user: 'igor'
    }
    const todo: Todo = {
      closed: false,
      todo: 'get fit',
      user: 'igor'
    }
    service.postTodo(todo).subscribe(res => {
      expect(res).toEqual(expectedRes)
    })

    const req = httpTestingController.expectOne('api/todos/submit');
    expect(req.request.method).toEqual('POST');
    req.flush(todo);

    expect(service.todos[0]).toEqual(todo)
    done()
  })

  it('should toggle todo', (done) => {
   
    const postToggleTodo = {
      closed: true,
      todo: 'buy milk',
      user: 'igor',
      _id: '1'
    }

    service.add(todos)

    service.postToggleClosed(todos[0]).subscribe((todo:Todo) => {
      expect(todo).toEqual(postToggleTodo)
    })

    const req = httpTestingController.expectOne('api/todos/toggleClosed');
    expect(req.request.method).toEqual('POST');
    req.flush(postToggleTodo);

    expect(service.todos[0].closed).toBe(true)
    done()
  })
})
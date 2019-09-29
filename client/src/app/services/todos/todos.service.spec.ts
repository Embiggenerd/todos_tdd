import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'


import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService
  let httpTestingController: HttpTestingController

  const todos = [
    {
      closed: false,
      todo: 'buy milk',
      user: 'igor'
    },
    {
      closed: true,
      todo: 'train elephants',
      user: 'igor'
    }
  ]

  beforeEach(() => {
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add todos', () => {
    
    service.add(todos)
    expect(service.todos).toEqual(todos)
  })

  it('should get todos', () => {

    service.getTodos().subscribe(todosRet =>{
      expect(todosRet).toEqual(todos)
    })
    const req = httpTestingController.expectOne('api/todos/get');
    expect(req.request.method).toEqual('GET');
    req.flush(todos);
    expect(service.todos).toEqual(todos)
  })


});

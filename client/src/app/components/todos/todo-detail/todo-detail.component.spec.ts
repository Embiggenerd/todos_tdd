import { of } from 'rxjs';

import { TodoDetailComponent } from './todo-detail.component';
import { Todo } from '../../../models';
import { ActivatedRouteStub } from '../../../stubs/activated.route.mock'
/**
 * Testing routed components without testbed seems to be the simpler option.
 */
describe('TodooDetailComponent - no TestBed', () => {
  let activatedRoute: ActivatedRouteStub;
  let comp: TodoDetailComponent;
  let expectedTodo: Todo;
  let mockService: any;
  let location: any;

  beforeEach((done: any) => {
    expectedTodo = { _id:"42", user: 'Bubba', todo:"water elephants", closed: false };
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParams = { id: expectedTodo._id };

    location = jasmine.createSpyObj('location', {'back': {}});

    mockService = jasmine.createSpyObj('TodosService',
      {
        'getTodo': of(expectedTodo),
        'postTodo': of(expectedTodo)
      });

    comp = new TodoDetailComponent(<any>activatedRoute, mockService, location);
    comp.ngOnInit();

    mockService.getTodo.calls.first().returnValue.subscribe(done);
  });

  it('should expose the todo retrieved from the service', () => {
    expect(comp.todo).toBe(expectedTodo);
  });

  it('should post todo and go back on save', () => {
    comp.save();
    expect(mockService.postTodo.calls.any()).toBe(true);
    expect(location.back.calls.any()).toBe(true);
  });

  it('should navigate when goback invoked', () => {
    comp.goBack();
    expect(location.back.calls.any()).toBe(true)
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,  HttpTestingController } from '@angular/common/http/testing'


import { TodosComponent } from './todos.component';
import { TodosForm } from '../../forms/todos-form/todos-form.component'
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TodosComponent,
        TodosForm
       ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backend = TestBed.get(HttpTestingController)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get todos on init', () => {
    const req = backend.expectOne('api/todos/get')
    expect(req.request.method).toEqual('GET')
  })

  it('displays todos it receives', ()=>{
    // flush req with preset todos
  })
});

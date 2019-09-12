import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForm } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserForm;
  let fixture: ComponentFixture<UserForm>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserForm ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});

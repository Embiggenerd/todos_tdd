import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }
  from '@angular/forms';
import { TodosService } from '../../../services/todos/todos.service'
import { Todo } from '../../../models'

@Component({
  selector: 'app-todos-form',
  templateUrl: './todos-form.component.html',
  styleUrls: ['./todos-form.component.sass']
})
export class TodosForm implements OnInit {
  form: FormGroup

  todo = new FormControl("", Validators.required)

  @Output() newTodoEvent = new EventEmitter<Todo>()

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      "todo": this.todo,
    });
  }

  ngOnInit() { }

  onSubmit(event: Event) {
    event.preventDefault()
    this.outputTodo(this.form.value.todo)
    this.reset()
  }

  outputTodo(todo: Todo) {
    this.newTodoEvent.emit(todo)
  }

  reset(): void {
    this.form.reset();
  }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './components/todos/todos/todos.component'
import { UserForm } from './components/forms/user-form/user-form.component';

export const routes: Routes = [
  {path: 'todos', component: TodosComponent},
  {path: 'signup', component: UserForm }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

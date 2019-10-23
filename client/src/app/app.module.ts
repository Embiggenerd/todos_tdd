import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './services/user/user.service';
import { LogService } from './services/log/log.service';
import { UserForm } from './components/user/user-form/user-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS, } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { ErrorService } from './services/error/error.service';
import { ErrorComponent } from './components/error/error.component';
import { GlobalErrorHandler } from './classes/globa-error.handler'
import { ServerErrorInterceptor } from './classes/server-error-interceptor'
import { TodosComponent } from './components/todos/todos/todos.component';
import { TodosForm } from './components/todos/todos-form/todos-form.component';
import { TodosService } from './services/todos/todos.service';
import { TodoDetailComponent } from './components/todos/todo-detail/todo-detail.component'

@NgModule({
  declarations: [
    AppComponent,
    UserForm,
    ErrorComponent,
    TodosComponent,
    TodosForm,
    TodoDetailComponent,
  ],
  entryComponents: [ErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    UserService,
    LogService,
    ErrorService,
    TodosService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import {ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './services/user/user.service';
import { LogService } from './services/log/log.service';
import { UserForm } from './components/forms/user-form/user-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS, } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { ErrorService } from './services/error/error.service';
import { ErrorComponent } from './components/error/error.component';
import { GlobalErrorHandler } from './classes/globa-error.handler'
import { ServerErrorInterceptor } from './classes/server-error-interceptor'
import { from } from 'rxjs';
import { TodosComponent } from './components/todos/todos/todos.component';


@NgModule({
  declarations: [
    AppComponent,
    UserForm,
    ErrorComponent,
    TodosComponent,
  ],
  entryComponents: [ErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    LogService,
    ErrorService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

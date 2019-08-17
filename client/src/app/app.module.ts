import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './services/user/user.service';
import { LogService } from './services/log/log.service';
import { UserForm } from './components/forms/user-form/user-form.component';
import { HttpClientModule }    from '@angular/common/http';
import { ErrorService } from './services/error/error.service';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    UserForm,
    ErrorComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UserService, LogService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

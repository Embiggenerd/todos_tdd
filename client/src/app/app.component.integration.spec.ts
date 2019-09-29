// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By, BrowserModule } from '@angular/platform-browser';
// // import { FormsModule } from '@angular/forms';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AppRoutingModule, routes } from './app-routing.module';
// import { NgModule } from '@angular/core'
// // import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
// import { HttpClient } from '@angular/common/http'
// import { of } from 'rxjs'

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import { AppComponent } from './app.component'
// import { TodosComponent } from './components/todos/todos/todos.component'
// import { TodosService } from './services/todos/todos.service';
// import { Todo } from './models'
// import { UserForm } from './components/forms/user-form/user-form.component'
// import { UserService } from './services/user/user.service';
// import { UserServiceMock } from './services/user/user.service.mock';
// import { LogService } from './services/log/log.service'




// fdescribe('Complete App integration test', () => {
//     let component: AppComponent
//     let fixture: ComponentFixture<AppComponent>
//     // const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['get']);
//     // httpClientSpy.get.and.returnValue(of([new TODOItem('Buy Milk', 'Lala')]));
//     const userServiceMock = new UserServiceMock(new LogService(), false)

//     beforeEach(async () => {

//         TestBed.configureTestingModule({
//             declarations: [
//                 AppComponent,
//                 UserForm,
//                 TodosComponent,
//             ],
//             imports: [
//                 // BrowserModule,
//                 // BrowserAnimationsModule,
//                 AppRoutingModule,
//                 HttpClientTestingModule,
//                 ReactiveFormsModule,
//                 FormsModule,

//             ],
//             providers: [
//                 TodosService,
//                 {
//                     provide: UserService,
//                     useValue: userServiceMock
//                 },
//             ]
//         }).compileComponents();
//     })

//     beforeEach(() => {
//         fixture = TestBed.createComponent(AppComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     it('should show user the signup page if not authorized', () => {
//         const compiled = fixture.debugElement.nativeElement;
//         fixture.detectChanges()

//         const signupStatement = compiled.querySelector('[data-test-id="signup-statement"]')
//         fixture.detectChanges()
//         expect(signupStatement).toContain('Please signup with a unique username and password (passwords are never stored in plain text)')
//     })
// })
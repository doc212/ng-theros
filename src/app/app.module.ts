import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import { app_routing } from "./app.routing"
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';

import { AuthGuard } from './services/auth.guard';
import { AuthService } from "./services/auth.service";
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { WorksIndexComponent } from './works-index/works-index.component';
import { WorksService } from "app/services/works.service";
import { ApiService } from "app/services/api.service";
import { AdminTeachersComponent } from './admin-teachers/admin-teachers.component';
import { UserService } from './services/user.service';
import { AdminTeacherPasswordComponent } from './admin-teacher-password/admin-teacher-password.component';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NotFoundComponent,
    HomeComponent,
    WorksIndexComponent,
    AdminTeachersComponent,
    AdminTeacherPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    app_routing,
    ModalModule.forRoot(),
    BootstrapModalModule,
    RouterModule,
    HttpModule
  ],
  providers: [
    AuthGuard,
    WorksService,
    ApiService,
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

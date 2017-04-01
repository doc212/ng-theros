import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import {app_routing} from "./app.routing"
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';

import {AuthGuard} from './services/auth.guard';
import {AuthService} from "./services/auth.service";
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    app_routing,
    RouterModule,
    HttpModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
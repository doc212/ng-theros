import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import {app_routing} from "./app.routing"
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';

import {AuthService} from "./services/auth.service";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    app_routing,
    RouterModule,
    HttpModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

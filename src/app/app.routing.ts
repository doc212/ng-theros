import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './services/auth.guard';

const app_routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

export const app_routing = RouterModule.forRoot(app_routes);

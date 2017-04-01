import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {NotFoundComponent} from './not-found/not-found.component';

const app_routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

export const app_routing = RouterModule.forRoot(app_routes);

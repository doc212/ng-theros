import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from './signin/signin.component';

const app_routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: '**', pathMatch: 'full', redirectTo:'signin' }
];

export const app_routing = RouterModule.forRoot(app_routes);

import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { WorksIndexComponent } from "app/works-index/works-index.component";

const app_routes: Routes = [
  { path: 'works', component: WorksIndexComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: "home", pathMatch: "full" },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

export const app_routing = RouterModule.forRoot(app_routes);

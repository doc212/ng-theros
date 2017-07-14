import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { WorksIndexComponent } from "app/works-index/works-index.component";
import {AdminTeachersComponent} from 'app/admin-teachers/admin-teachers.component';

const app_routes: Routes = [
  { path: 'admin/teachers', component: AdminTeachersComponent, canActivate: [AuthGuard] },
  { path: 'works', component: WorksIndexComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: "home", pathMatch: "full" },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

export const app_routing = RouterModule.forRoot(app_routes);

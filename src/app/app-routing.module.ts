import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {UserListComponent} from './user-list/user-list.component';
import {AuthGuardService} from './services/auth-guard';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'all-users', component: UserListComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

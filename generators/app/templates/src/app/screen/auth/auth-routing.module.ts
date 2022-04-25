/****** ANGULAR ******/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/****** PAGE COMPONENT ******/
import { LoginComponent } from './layout/login/login.component';
import { PwdForgetComponent } from './layout/pwd-forget/pwd-forget.component';


const routes: Routes = [{
  path: 'auth',
  children: [{
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'password-forget',
    component: PwdForgetComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }

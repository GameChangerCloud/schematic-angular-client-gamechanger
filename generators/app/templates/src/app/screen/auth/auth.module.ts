/****** ANGULAR MODULE ******/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/****** MODULE ******/
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';

/****** PAGE ******/
import { LoginComponent } from './layout/login/login.component';
import { PwdForgetComponent } from './layout/pwd-forget/pwd-forget.component';

/****** COMPONENT ******/
import { PwdForgetFormComponent } from './component/pwd-forget-form/pwd-forget-form.component';
import { LoginFormComponent } from './component/login-form/login-form.component';

/****** SERVICE ******/
import { AuthService } from './service/auth.service';
import { TokenStorage } from './service/token.storage';
import { LoginFormSnackbarComponent } from './component/login-form-snackbar/login-form-snackbar.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    PwdForgetComponent,
    PwdForgetFormComponent,
    LoginFormComponent,
    LoginFormSnackbarComponent
  ],
  providers: [
    AuthService,
    TokenStorage
  ],
  
})

export class AuthModule { }

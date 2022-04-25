/****** ANGULAR ******/
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/****** SERVICE ******/
import { AuthService } from '@screen/auth/service/auth.service';
import { LoginFormSnackbarComponent } from '../login-form-snackbar/login-form-snackbar.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent {

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  email: string;
  password: string;

  /**
   * Function to call authService login method
   * Call AuthService login method with user creditial then ==>
   * Redirect router to dashboard where authGuard is required ==>
   * If user not logged AuthGard will redirect router to auth/login again
   * Error will be shown using snackbar
   */
  login(): void {
    this.authService.login(this.email, this.password)
    .subscribe(data => {
      this._snackBar.dismiss();
      this.router.navigate(['project']);
    },
    (error) => {
      // Use LoginFormSnackbarComponent to render error
      this._snackBar.openFromComponent(LoginFormSnackbarComponent);
     });
  }
}

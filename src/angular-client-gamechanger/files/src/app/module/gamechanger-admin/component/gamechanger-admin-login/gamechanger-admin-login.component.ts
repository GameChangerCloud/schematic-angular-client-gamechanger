import { Component, OnInit } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'gamechanger-admin-login',
  templateUrl: './gamechanger-admin-login.component.html',
  styleUrls: ['./gamechanger-admin-login.component.scss']
})
export class GamechangerAdminLoginComponent implements OnInit {

  isLoading: Boolean = false;
  email: string = "";
  password: string = "";
  loginError: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.isLoading = true;

      let authenticationDetails = new AuthenticationDetails({
          Username: this.email,
          Password: this.password,
      });

      let poolData = {
        UserPoolId: environment.cognitoUserPoolId,
        ClientId: environment.cognitoClientId 
      };
      
      let userPool = new CognitoUserPool(poolData);
      let userData = { Username: this.email, Pool: userPool };
      var cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result:any) => {
          let token =result.getIdToken().getJwtToken()
          this.authService.setToken(token)
          this.router.navigate(["admin/home"])
        },
        onFailure: (err:any) => {
          alert(err.message || JSON.stringify(err));
          this.isLoading = false;
          this.loginError = true;
        },
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'gamechanger-admin-navbar',
  templateUrl: './gamechanger-admin-navbar.component.html',
  styleUrls: ['./gamechanger-admin-navbar.component.scss']
})
export class GamechangerAdminNavbarComponent implements OnInit {

  activatedRoute = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(){

    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoClientId
    };
    let userPool = new CognitoUserPool(poolData);
    let cognitoUser = userPool.getCurrentUser();
    cognitoUser?.signOut();
    localStorage.removeItem('CognitoAuthToken')
    this.router.navigate(["admin/login"])
  }

  activateRoute(activatedRoute: string) {
    this.activatedRoute = activatedRoute;
  }

  // navigateTo(value:string) {
  //   if (value) {
  //       this.router.navigate(['admin/models/',value]);
  //   }
  //   return false;
  // }
}

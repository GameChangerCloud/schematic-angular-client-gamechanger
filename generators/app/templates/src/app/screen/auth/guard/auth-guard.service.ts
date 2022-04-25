// Basic
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {}

  /**
   * Check user authToken to know if user logged
   */
  canActivate(): boolean {
    const userToken: string = (<any>window).localStorage.AuthToken;
    if (userToken) { return true; }
    this.router.navigate(['/auth/login']);
    return false;
  }
}

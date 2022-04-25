import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

@Injectable()
export class OnlyAdminUsersGuard implements CanActivate {
  constructor() {}

  /***
   * Check if user have admin right
   */
  canActivate() {
    const user = (<any>window).user;
    return user && user.isAdmin
  }
}

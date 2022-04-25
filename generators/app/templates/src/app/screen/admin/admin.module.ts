/***************************BASIC***************************/
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/***************************MODULES***************************/
import { AdminRoutingModule } from './admin-routing.module';

/***************************COMPONENT***************************/
import {AdminComponent} from './layout/admin.component';

/***************************SERVICES***************************/
import {OnlyAdminUsersGuard} from './guard/admin-user-guard';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  providers: [
    OnlyAdminUsersGuard
  ]})
export class AdminModule {
  //TODO: Design & integrate admin module
}

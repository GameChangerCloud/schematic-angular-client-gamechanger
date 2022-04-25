/***************************BASIC***************************/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/***************************COMPONENTS***************************/
import { AdminComponent } from './layout/admin.component';

/***************************SERVICES***************************/
import { OnlyAdminUsersGuard } from './guard/admin-user-guard';

const routes: Routes = [{
  path: 'admin',
  canActivate: [OnlyAdminUsersGuard],
  children: [{
    path: '',
    component: AdminComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {}

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth-guard.service';
import { AuthService } from './services/auth.service';

/*** LAYOUTS ***/
import { GameChangerAdminLoginLayoutComponent } from './layout/gamechanger-admin-login-layout/gamechanger-admin-login-layout.component';
import { GamechangerAdminMainLayoutComponent } from './layout/gamechanger-admin-main-layout/gamechanger-admin-main-layout.component';
import { GamechangerAdminHomeLayoutComponent } from './layout/gamechanger-admin-home-layout/gamechanger-home-layout.component';
import { GamechangerAdminTablesLayoutComponent } from './layout/gamechanger-admin-tables-layout/gamechanger-admin-tables-layout.component';
import { GamechangerAdminModelsLayoutComponent } from './layout/gamechanger-admin-models-layout/gamechanger-admin-models-layout.component';

const routes: Routes = [
  {
    path: '',
    component: GamechangerAdminMainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: GamechangerAdminHomeLayoutComponent,
      },
      {
        path: 'tables',
        component: GamechangerAdminTablesLayoutComponent,
      },
      {
        path: 'models/:model',
        component: GamechangerAdminModelsLayoutComponent,
      },
    ],
  },
  {
    path: 'login',
    component: GameChangerAdminLoginLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthService],
})
export class GamechangerAdminRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth-guard.service';
import { AuthService } from './services/auth.service';
import { GameChangerAdminLoginLayoutComponent } from './layout/gamechanger-admin-login-layout/gamechanger-admin-login-layout.component';
import { GamechangerAdminHomeLayoutComponent } from './layout/gamechanger-admin-home-layout/gamechanger-home-layout.component';
import { GamechangerAdminModelsLayoutComponent } from './layout/gamechanger-admin-models-layout/gamechanger-admin-models-layout.component';
import { GamechangerAdminTablesLayoutComponent } from './layout/gamechanger-admin-tables-layout/gamechanger-admin-tables-layout.component';

const routes: Routes = [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }, 
      {
        path: 'home',
        canActivate: [AuthGuard],
        component: GamechangerAdminHomeLayoutComponent,
      },
      {
        path: 'tables',
        canActivate: [AuthGuard],
        component: GamechangerAdminTablesLayoutComponent,
      },
      {
        path: 'models',
        canActivate: [AuthGuard],
        component: GamechangerAdminModelsLayoutComponent,
      },
      {
        path: 'login',
        component: GameChangerAdminLoginLayoutComponent,
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class GamechangerAdminRoutingModule {}

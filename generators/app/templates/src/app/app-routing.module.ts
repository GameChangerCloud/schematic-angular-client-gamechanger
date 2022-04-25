/****** ANGULAR ******/
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

/****** LAYOUT ******/
import { AppMainLayoutComponent } from '@app/layout/app-main-layout/app-main-layout.component';

/****** COMPONENT ******/
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { FactonicsSpinnerComponent } from './shared/component/atom/factonics-spinner/factonics-spinner.component';

/****** GUARD ******/
import { AuthGuard } from '@screen/auth/guard/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: AppMainLayoutComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AppMainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        component: FactonicsSpinnerComponent
      },
      {
        path: 'table',
        canActivate: [AuthGuard],
        component: FactonicsSpinnerComponent
        // loadChildren: () =>
        // import('@screen/project/project.module').then((m) => m.ProjectModule),
      },
      {
        path: 'models',
        canActivate: [AuthGuard],
        component: FactonicsSpinnerComponent
      },
    ],
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@screen/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: [],
})
export class AppRoutingModule {}

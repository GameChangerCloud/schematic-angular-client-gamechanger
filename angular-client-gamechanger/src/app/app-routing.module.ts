import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guard/auth-guard.service';

/**** LAYOUTS COMPONENT ****/
import { GamechangerSuccessLayoutComponent } from './layout/gamechanger-success-layout/gamechanger-success-layout.component';
import { GamechangerPagenotfoundLayoutComponent } from './layout/gamechanger-pagenotfound-layout/gamechanger-pagenotfound-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'success', pathMatch: 'full' },
  { path: 'success', component: GamechangerSuccessLayoutComponent },
  { path: 'admin', loadChildren: () =>import('./module/gamechanger-admin/gamechanger-admin.module').then((m) => m.GamechangerAdminModule)},
  { path: '**', component: GamechangerPagenotfoundLayoutComponent } 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

/**** IMPORTED  MODULE ****/
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/module/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

/**** GAMECHANGER ADMIN SERVICE | GUARD | COMMON ****/
import { AuthService } from './services/auth.service';
import { AuthGuard } from 'src/app/core/guard/auth-guard.service';
import { GamechangerAdminRoutingModule } from './gamechanger-admin-routing.module';

/**** GAMECHANGER ADMIN COMPONENT ****/
import { GamechangerAdminLoginComponent } from './component/gamechanger-admin-login/gamechanger-admin-login.component';
import { GamechangerAdminLoaderComponent } from './component/gamechanger-admin-loader/gamechanger-admin-loader.component';
import { GamechangerAdminNavbarComponent } from './component/gamechanger-admin-navbar/gamechanger-admin-navbar.component';

/**** GAMECHANGER ADMIN LAYOUTS ****/
import { GameChangerAdminLoginLayoutComponent } from './layout/gamechanger-admin-login-layout/gamechanger-admin-login-layout.component';
import { GamechangerAdminTablesLayoutComponent } from './layout/gamechanger-admin-tables-layout/gamechanger-admin-tables-layout.component';
import { GamechangerAdminModelsLayoutComponent } from './layout/gamechanger-admin-models-layout/gamechanger-admin-models-layout.component';
import { GamechangerAdminHomeLayoutComponent } from './layout/gamechanger-admin-home-layout/gamechanger-home-layout.component';

@NgModule({
  declarations: [
    GamechangerAdminLoginComponent,
    GamechangerAdminNavbarComponent,
    GameChangerAdminLoginLayoutComponent,
    GamechangerAdminHomeLayoutComponent,
    GamechangerAdminTablesLayoutComponent,
    GamechangerAdminModelsLayoutComponent,
    GamechangerAdminLoaderComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule, 
    GamechangerAdminRoutingModule,
    HttpClientModule,
  ],
  providers:[
    AuthGuard,
    AuthService
  ]
})
export class GamechangerAdminModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './module/angular-material.module';

/**** MODULE ****/
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { GamechangerAdminModule } from './module/gamechanger-admin/gamechanger-admin.module';

/**** LAYOUTS COMPONENT ****/
import { GamechangerSuccessLayoutComponent } from './layout/gamechanger-success-layout/gamechanger-success-layout.component';
import { GamechangerPagenotfoundLayoutComponent } from './layout/gamechanger-pagenotfound-layout/gamechanger-pagenotfound-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    GamechangerSuccessLayoutComponent,
    GamechangerPagenotfoundLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    GamechangerAdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

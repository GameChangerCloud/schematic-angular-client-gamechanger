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

/**** NGRX ****/
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {EntityDataModule,EntityMetadataMap, DefaultDataServiceConfig} from  '@ngrx/data';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { entityConfig } from './store/entity-metadata';
import { EntityStoreModule } from './store/entity-store.module';



const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.endpoint_uri,
  timeout: 8000, // request timeout
}

@NgModule({
  declarations: [
    AppComponent,
    GamechangerSuccessLayoutComponent,
    GamechangerPagenotfoundLayoutComponent,
  ],
  imports: [
    EntityStoreModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    GamechangerAdminModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [{ provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }

/****** ANGULAR ******/
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

/****** GUARD ******/
import { throwIfAlreadyLoaded } from './guard/module-import.guard';

/****** INTERCEPTOR ******/
import { AuthHeaderInterceptor } from './interceptor/header.interceptor';
import { CatchErrorInterceptor } from './interceptor/http-error.interceptor';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchErrorInterceptor,
      multi: true,
    },
  ],
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Check if core module is not already loaded
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}


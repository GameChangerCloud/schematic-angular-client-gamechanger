/****** ANGULAR ******/
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/****** GUARD ******/
import { throwIfAlreadyLoaded } from '@core/guard/module-import.guard';

/****** INTERCEPTOR ******/
import { AuthHeaderInterceptor } from '@core/interceptor/header.interceptor';
import { CatchErrorInterceptor } from '@core/interceptor/http-error.interceptor';

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

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/internal/operators';
@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {

  /**
   * Intercept request to put right header
   * @param req
   * @param next
   */
  intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return next.handle(request).tap(
    //   (event: HttpEvent<any>) => {},
    //   (err: any) => {
    //     if (err instanceof HttpErrorResponse) {
    //       const text =
    //         err.error && err.error.message ? err.error.message : err.statusText;
    //       (<any>window).globalEvents.emit('open error dialog', text);
    //     }
    //   }
    // );
    return next.handle(request); // TO FIX breaking change on do/tap method from rxjs
  }

}

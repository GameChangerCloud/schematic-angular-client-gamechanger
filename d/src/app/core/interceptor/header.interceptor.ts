import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  /**
   * Intercept and set cognito AuthToken to all request
   * @param req
   * @param next
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let clonedRequest = req
      switch (environment.api_auth_mechanism) {
        case 'cognito':
          const token = localStorage.getItem('CognitoAuthToken');      
           clonedRequest = req.clone({
            headers: req.headers.set(
              'Authorization',
              token ? `Bearer ${token}` : 'undefined',
            ).set( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set( 'Access-Control-Allow-Origin', '*'),
          });
          break;
        case 'none':
           clonedRequest = req
          break;
        default:
           clonedRequest = req
          break;
      }
      return next.handle(clonedRequest);
  }
}

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';


// import { TokenStorage } from '@screen/auth/service/token.storage';
import { Injectable } from '@angular/core';
// import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  /**
   * Intercept request to put right header
   * @param req
   * @param next
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      // const token = new TokenStorage();
      // const tokenVal = token.getToken();
      // const clonedRequest = req.clone({
      //   headers: req.headers.set(
      //     'Authorization',
      //     tokenVal ? `Bearer ${tokenVal}` : 'undefined'
      //   ),
      // });
      const clonedRequest = req // TO FIX 
      return next.handle(clonedRequest);
  }
}

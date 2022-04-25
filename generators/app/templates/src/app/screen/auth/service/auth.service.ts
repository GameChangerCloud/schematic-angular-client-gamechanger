import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TokenStorage } from './token.storage';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import { setUserStore } from '../../../store/user/user.actions';
import { User } from '@app/data/api-app/user/schema/user';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private token: TokenStorage,
    private store: Store<AppState>) {}

  public $userSource = new Subject<any>();

  /**
   * Check if user is registered
   * If there is error, it will be handled in the login page.
   * @param email
   * @param password
   */
  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.http
        .post('/api/auth/login', {
          email,
          password,
        })
        .subscribe((data: any) => {
          observer.next({ user: data.user });
          this.setUser(data.user);
          this.token.saveToken(data.token);
          observer.complete();
        },
        (error) => {
          observer.error(error);
         });
    });
  }

  /**
   * Register user // TODO: To improve with ur schema
   * @param firstName
   * @param lastName
   * @param socialReason
   * @param email
   * @param role
   * @param password
   * @param repeatPassword
   */
  register(
    firstName: string,
    lastName: string,
    socialReason: string,
    email: string,
    role: string,
    password: string,
    repeatPassword: string
  ): Observable<any> {
    return new Observable((observer) => {
      this.http
        .post('/api/auth/register', {
          firstName,
          lastName,
          socialReason,
          role,
          email,
          password,
          repeatPassword,
        })
        .subscribe((data: any) => {
          observer.next({ user: data.user });
          this.setUser(data.user);
          this.token.saveToken(data.token);
          observer.complete();
        });
    });
  }

  /**
   * Set user
   * @param user
   */
  setUser(user: User): void {
    // if (user) { user.isAdmin = user.role.indexOf('admin') > -1; }
    this.$userSource.next(user);
    this.store.dispatch(setUserStore(user));
    (<any>window).user = user;
  }

   /**
   * Get user
   */
  getUser(): Observable<any> {
    return this.$userSource.asObservable();
  }

   /**
   * Get user logged
   * @param user
   */
  me(): Observable<any> {
    return new Observable((observer) => {
      const tokenVal = this.token.getToken();
      if (!tokenVal) { return observer.complete(); }
      this.http.get('/api/auth/me').subscribe((data: any) => {
        observer.next({ user: data.user });
        this.setUser(data.user);
        observer.complete();
      });
    });
  }

   /**
   * Signout user
   * @param user
   */
  signOut(): void {
    this.token.signOut();
    this.setUser(null);
    delete (<any>window).user;
  }
}

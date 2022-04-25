// import { Injectable } from '@angular/core';
// import { logoutStore, changePassword, setUserStore, authUser, changeLang } from './user.actions';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
// import { Store } from '@ngrx/store';
// import { AppState, selectUser } from '@store/app.state';
// import { UserService } from '@data/api-app/user/service/user.service';
// import { AuthService } from '@screen/auth/service/auth.service';

// @Injectable()
// export class UserEffects {

//   constructor(
//     private actions$: Actions,
//     private store: Store<AppState>,
//     private userService: UserService,
//     private authService: AuthService,
//   ) {}

//   logout$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(logoutStore)
//     );
//   });

//   changePassword$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(changePassword),
//       withLatestFrom(this.store.select(selectUser)),
//       mergeMap(([userInput, user]) =>
//         this.userService.putUserPassword(user.userId, userInput.newPassword)
//           .pipe(
//             map(password => console.log(password.result)),
//           )
//       )
//     );
//   }, { dispatch: false });

//   login$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(authUser),
//       mergeMap((user) => this.authService.login(user.email, user.password)
//       .pipe(
//         map(res => setUserStore(res.result))))
//     );
//   });

//   changeLang$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(changeLang),
//       withLatestFrom(this.store.select(selectUser)),
//       mergeMap(([userInput, user]) => {
//         user.lang = userInput.lang;
//         return this.userService.putUserById(user.userId, user)
//           .pipe(
//             map(res => setUserStore(res.result))
//           );
//       })
//     )
//   });

// }


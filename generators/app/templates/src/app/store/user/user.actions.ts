// import { User } from '@app/data/api-app/user/schema/user';
// import { createAction, props } from '@ngrx/store';

// export enum UserActionsTypes {
//   SET_USER = '[User] set user',
//   AUTH_USER = '[User] auth user',
//   LOGOUT = '[User] logout user',
//   TOGGLE_MENU = '[User] toggle menu',
//   CHANGE_PASSWORD = '[User] change password',
//   UPDATE_USER = '[User] update user',
//   CHANGE_LANG = '[User] change lang'
// }

// export const setUserStore = createAction (
//   UserActionsTypes.SET_USER,
//   props<User>()
// );

// export const authUser = createAction (
//   UserActionsTypes.AUTH_USER,
//   props<{ email: string , password: string }>()
// );

// export const logoutStore = createAction(
//   UserActionsTypes.LOGOUT
// );

// export const toggleSideNav = createAction(
//   UserActionsTypes.TOGGLE_MENU
// );


// export const changePassword = createAction(
//   UserActionsTypes.CHANGE_PASSWORD,
//   props<{ newPassword: string }>()
// );

// export const updateUser = createAction(
//   UserActionsTypes.UPDATE_USER,
//   props<any>()
// );

// export const changeLang = createAction(
//   UserActionsTypes.CHANGE_LANG,
//   props<{ lang: string }>(),
// )
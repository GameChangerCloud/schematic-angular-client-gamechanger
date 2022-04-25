import { createReducer, on, Action } from '@ngrx/store';
import { initialUserState, UserState } from './user.state';
import * as UserActions from './user.actions';
import { state } from '@angular/animations';

const _userReducer = createReducer<UserState>(
  initialUserState,
  on(UserActions.setUserStore, (_userState, user) => ({..._userState, user: user})),
  // on(UserActions.authUser, (_userState, { email, }) => (_userState)),
  on(UserActions.logoutStore, () => (initialUserState)),
  on(UserActions.toggleSideNav, (_userState) => ({..._userState, isSideNavExpanded : !_userState.isSideNavExpanded}))
);

export function userReducer(userState: UserState, action: Action) {
  return _userReducer(userState, action);
}

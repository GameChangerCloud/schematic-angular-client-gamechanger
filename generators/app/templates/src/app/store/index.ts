import { ActionReducerMap } from '@ngrx/store';
import { projectsReducer } from '@store/project/project.reducer';
import { usecasesReducer } from '@store/usecase/usecase.reducer';
import { userReducer } from '@store/user/user.reducer';
import { routerReducer } from '@ngrx/router-store';
import { AppState } from './app.state';

export const reducers: ActionReducerMap<AppState> = {
  projectsState: projectsReducer,
  usecasesState: usecasesReducer,
  userState : userReducer,
  router : routerReducer,
};

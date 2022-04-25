import { RouterReducerState } from '@ngrx/router-store';
import { createSelector } from '@ngrx/store';
import { ProjectsState, initialProjectsState } from './project/project.state';
import { UseCasesState, initialUseCasesState } from './usecase/usecase.state';
import { initialUserState, UserState } from './user/user.state';
import { RouterStateUrl } from './router/custom-route-serializer';

export interface AppState {
  projectsState: ProjectsState;
  usecasesState: UseCasesState;
  userState: UserState;
  router: RouterReducerState<RouterStateUrl>;
}
/*
export const initialState: AppState = {
  projectsState: initialProjectsState,
  usecasesState: initialUseCasesState,
  userState : initialUserState,
};*/

export const selectProjectsState = (state: AppState) => state.projectsState;
export const selectUseCasesState = (state: AppState) => state.usecasesState;
export const selectUserState = (state: AppState) => state.userState;

export const selectURLparamsID = (state: AppState) => state.router.state.params.id;

export const selectUseCases = createSelector(
  selectUseCasesState,
  (usecasesState: UseCasesState) => usecasesState.usecases
);

export const selectUseCasesLoading = createSelector(
  selectUseCasesState,
  (usecasesState: UseCasesState) => usecasesState.loading
);

export const selectProjects = createSelector(
  selectProjectsState,
  (projectsState: ProjectsState) => projectsState.projects
);

export const selectProjectsLoading = createSelector(
  selectProjectsState,
  (projectsState: ProjectsState) => projectsState.loading
);

export const selectUser = createSelector(
  selectUserState,
  (userState: UserState) => userState.user
);

export const selectIsSideNavExpanded = createSelector(
  selectUserState,
  (userState: UserState) => userState.isSideNavExpanded
);

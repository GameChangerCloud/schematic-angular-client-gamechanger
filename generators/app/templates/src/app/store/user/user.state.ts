import { User } from '@app/data/api-app/user/schema/user';

export interface UserState {
  user: User | undefined;
  isSideNavExpanded: boolean;
  lang: string;
}

export const initialUserState: UserState = {
  user: undefined,
  isSideNavExpanded: true,
  lang: 'eng',
};


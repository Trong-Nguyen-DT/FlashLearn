export type UserProfileType = {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  email: string;
  phone: string;
};

export interface IAuthState {
  isAuthenticated?: boolean;
  user: UserProfileType;
  isLoggingOut: boolean;
}

export const initialState: IAuthState = {
  isAuthenticated: null,
  user: null,
  isLoggingOut: false,
};

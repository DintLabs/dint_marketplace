import { UserCredential } from 'firebase/auth';

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUser = null | Record<string, any>;

export type AuthState = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isInitialized: boolean;
  user: AuthUser;
  idToken?: string;
};

export type FirebaseContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  isAdmin: boolean;
  user: AuthUser;
  method: 'firebase';
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userType: string
  ) => Promise<void>;
  loginWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (objUser: AuthUser) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
};

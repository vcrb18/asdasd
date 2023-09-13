import { AxiosInstance } from 'axios';

import { User } from '@/ts/interfaces/user';

import { SessionState } from './sessionTypes';

type TokenStore = {
  get: () => string | null;
  set: (token: string) => void;
  del: () => void;
};

type AuthContextProps = {
  store: TokenStore;
  user: User;
  signUp: (params: SignUpParams) => Promise<void>;
  signIn: (params: SignInParams) => Promise<void>;
  signOut: () => void;
  state: SessionState;
};

type AuthProviderProps = {
  store: TokenStore;
  client: AxiosInstance;
  children: React.ReactNode;
};

type SignInParams = { email: string; password: string };
type SignUpParams = SignInParams;

export type { AuthContextProps, AuthProviderProps, SignInParams, SignUpParams, TokenStore };

import { AxiosInstance } from 'axios';

import { User } from '@/ts/interfaces/user';

type AuthContextProps = {
  user: User | null;
  signUp: (params: SignUpParams) => Promise<void>;
  signIn: (params: SignInParams) => Promise<void>;
  signOut: () => void;
  state: 'loading' | 'unauthenticated' | 'authenticated';
};

type AuthProviderProps = {
  store: {
    get: () => string | null;
    set: (token: string) => void;
    del: () => void;
  };
  client: AxiosInstance;
  children: React.ReactNode;
};

type SignInParams = { email: string; password: string };
type SignUpParams = SignInParams;

export type { AuthContextProps, AuthProviderProps, SignInParams, SignUpParams };

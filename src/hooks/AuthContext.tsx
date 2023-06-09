import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AxiosRequestHeaders } from 'axios';

import { User } from '@/ts/interfaces/user';
import { AuthContextProps, AuthProviderProps, SignInParams, SignUpParams } from '@/ts/types/authContext';

const AuthContext = createContext<AuthContextProps | null>(null);

function AuthProvider({ store, client, ...props }: AuthProviderProps) {
  const [state, setState] = useState<'loading' | 'unauthenticated' | 'authenticated'>('loading');
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);

  const signOut = useCallback(() => {
    store.del();
    setToken(undefined);
    setUser(null);
    setState('unauthenticated');
  }, [store]);

  const setLoadingState = useCallback(
    async (newToken: string) => {
      store.set(newToken);
      setState('loading');
      setUser(null);
      setToken(newToken);
    },
    [store],
  );

  const getUserInfo = useCallback(async () => {
    try {
      const { data } = await client.get('/users/me');
      setUser(data.data);
      setState('authenticated');
    } catch (error) {
      console.error(error);
      signOut();
    }
  }, [client, signOut]);

  useEffect(() => {
    const token = store.get();
    if (token) {
      setLoadingState(token);
      getUserInfo();
    } else {
      signOut();
    }
  }, [setLoadingState, getUserInfo, signOut, store]);

  useEffect(() => {
    if (!token) return;
    const interceptor = client.interceptors.request.use((config) => {
      if (!config.headers) config.headers = {} as AxiosRequestHeaders;
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return () => client.interceptors.request.eject(interceptor);
  }, [token, client, store]);

  const signUp = useCallback(
    async (params: SignUpParams) => {
      await client.post('/signup', { ...params });
    },
    [client],
  );

  const signIn = useCallback(
    async (params: SignInParams) => {
      const response = await client.post('/login', { ...params });
      const token = response.data.token;
      await setLoadingState(token);
      await getUserInfo();
    },
    [client, getUserInfo, setLoadingState],
  );

  const refreshUser = useCallback(async () => {
    const { data } = await client.get('/users/me');
    setUser(data);
  }, [client]);

  return <AuthContext.Provider {...props} value={{ user, signUp, signIn, signOut, state, refreshUser }} />;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within an AuthProvider');
  return context;
}

export { AuthProvider, useAuth };

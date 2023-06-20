import { createContext, useCallback, useContext, useEffect, useState } from 'react';

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
    (newToken: string) => {
      store.set(newToken);
      setState('loading');
      setUser(null);
      setToken(newToken);
    },
    [store],
  );

  const getUserInfo = useCallback(
    async (token: string | undefined) => {
      try {
        const { data } = await client.get('/users/me', {
          headers: {
            'x-access-token': token,
          },
        });

        setUser(data);
        setState('authenticated');
      } catch (error) {
        signOut();
      }
    },
    [client, signOut],
  );

  useEffect(() => {
    const token = store.get();
    if (token) {
      setLoadingState(token);
      getUserInfo(token);
    } else {
      signOut();
    }
  }, [setLoadingState, getUserInfo, signOut, store]);

  useEffect(() => {
    if (!token) return;
    const interceptor = client.interceptors.request.use((config) => {
      config.headers['x-access-token'] = token;
      return config;
    });
    return () => client.interceptors.request.eject(interceptor);
  }, [client, token]);

  const signUp = useCallback(
    async (params: SignUpParams) => {
      await client.post('/signup', { ...params });
    },
    [client],
  );

  const signIn = useCallback(
    async (params: SignInParams) => {
      const response = await client.post('/login', { ...params });
      setLoadingState(response.data.token);
      await getUserInfo(response.data.token);
    },
    [client, getUserInfo, setLoadingState],
  );

  return <AuthContext.Provider {...props} value={{ user, signUp, signIn, signOut, state }} />;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within an AuthProvider');
  return context;
}

export { AuthProvider, useAuth };

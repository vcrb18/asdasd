import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import AuthenticatedUser from '@/ts/classes/AuthenticatedUser';
import GuestUser from '@/ts/classes/GuestUser';
import { User } from '@/ts/interfaces/user';
import { AuthContextProps, AuthProviderProps, SignInParams, SignUpParams } from '@/ts/types/authContext';
import { OSessionState, SessionState } from '@/ts/types/sessionTypes';

const AuthContext = createContext<AuthContextProps | null>(null);

function AuthProvider({ store, client, ...props }: AuthProviderProps) {
  const [state, setState] = useState<SessionState>(OSessionState.Loading);
  const [user, setUser] = useState<User>(new GuestUser());
  const [token, setToken] = useState<string | undefined>(undefined);
  const shouldReRender = useRef(false);

  const signOut = useCallback(() => {
    store.del();
    setToken(undefined);
    setUser(new GuestUser());
    setState(OSessionState.Unauthenticated);
  }, [store]);

  const setLoadingState = useCallback(
    (newToken: string) => {
      document.cookie = 'token=' + newToken + '; path=/';
      store.set(newToken);
      setState(OSessionState.Loading);
      setUser(new GuestUser());
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
        const user = new AuthenticatedUser(data.user);
        setUser(user);
        setState(OSessionState.Authenticated);
      } catch (error) {
        signOut();
      }
    },
    [client, signOut],
  );

  useEffect(() => {
    if (!shouldReRender.current) {
      shouldReRender.current = true;
      const token = store.get();
      if (token) {
        setLoadingState(token);
        getUserInfo(token);
      } else {
        signOut();
      }
    }
  }, [getUserInfo, setLoadingState, signOut, store]);

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

  return <AuthContext.Provider {...props} value={{ user, signUp, signIn, signOut, state, store }} />;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within an AuthProvider');
  return context;
}

export { AuthProvider, useAuth };

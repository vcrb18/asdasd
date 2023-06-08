import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  signUp: (params: any) => Promise<void>;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
  state: "loading" | "unauthenticated" | "authenticated";
  refreshUser: () => Promise<void>;
}

interface AuthProviderProps {
  store: {
    get: () => string | null;
    set: (token: string) => void;
    del: () => void;
  };
  client: {
    get: (url: string, params?: any) => Promise<any>;
    post: (url: string, params?: any) => Promise<any>;
    interceptors: {
      request: {
        use: (handler: (config: any) => any) => void;
        eject: (interceptor: any) => void;
      };
    };
  };
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ store, client, ...props }: AuthProviderProps) {
  const [state, setState] = useState<
    "loading" | "unauthenticated" | "authenticated"
  >("loading");
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);

  const signOut = useCallback(() => {
    store.del();
    setToken(undefined);
    setUser(null);
    setState("unauthenticated");
  }, [store]);

  const setLoadingState = useCallback(
    async (newToken: string) => {
      store.set(newToken);
      setState("loading");
      setUser(null);
      setToken(newToken);
    },
    [store]
  );

  const getUserInfo = useCallback(async () => {
    try {
      const { data } = await client.get("/users/me");
      setUser(data.data);
      setState("authenticated");
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
    const interceptor = client.interceptors.request.use((config: any) => {
      if (!config.headers) config.headers = {};
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return () => client.interceptors.request.eject(interceptor);
  }, [token, client, store]);

  const signUp = useCallback(
    async ({ params }: { params: any }) => {
      await client.post("/signup", { ...params });
    },
    [client]
  );

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const payload = { password, email };
      const response = await client.post("/login", payload);
      console.log(response)
      const token = response.data.token;
      await setLoadingState(token);
      await getUserInfo();
    },
    [client, getUserInfo, setLoadingState]
  );

  const refreshUser = useCallback(async () => {
    const { data } = await client.get("/users/me");
    setUser(data);
  }, [client]);

  return (
    <AuthContext.Provider
      {...props}
      value={{ user, signUp, signIn, signOut, state, refreshUser }}
    />
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within an AuthProvider");
  return context;
}

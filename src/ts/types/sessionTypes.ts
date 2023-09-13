const OAuthPage = {
  Login: 'login',
  Register: 'register',
} as const;

const OSessionState = {
  Unauthenticated: 'unauthenticated',
  Loading: 'loading',
  Authenticated: 'authenticated',
} as const;

type AuthPage = (typeof OAuthPage)[keyof typeof OAuthPage];
type SessionState = (typeof OSessionState)[keyof typeof OSessionState];

export type { AuthPage, SessionState };
export { OAuthPage, OSessionState };

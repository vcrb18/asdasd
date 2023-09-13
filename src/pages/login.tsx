import AuthForm from '@/components/auth/AuthForm';

import { OAuthPage } from '@/ts/types/sessionTypes';

function SignIn() {
  return <AuthForm mode={OAuthPage.Login} />;
}

export default SignIn;

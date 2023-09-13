import AuthForm from '@/components/auth/AuthForm';

import { OAuthPage } from '@/ts/types/sessionTypes';

function Register() {
  return <AuthForm mode={OAuthPage.Register} />;
}

export default Register;

import * as Yup from 'yup';
import { emailValidation, passwordValidation } from './Validations';

export const LoginValidation = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

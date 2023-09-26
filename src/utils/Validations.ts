import * as Yup from 'yup';

export const emailValidation = Yup.string().email('error.invalidEmail').required('error.emailRequired');

export const passwordValidation = Yup.string().required('error.passwordRequired');

export const numberValidation = Yup.string().matches(/^[0-9]+$/, 'error.onlyNumbers');

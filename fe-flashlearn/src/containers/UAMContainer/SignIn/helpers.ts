import { ERROR_MESSAGES } from '@utils';
import * as yup from 'yup';

export type SignInFormType = {
  email: string;
  password: string;
};

export enum SignInFormField {
  'EMAIL' = 'email',
  'PASSWORD' = 'password',
}

export const signInInitialValues = {
  [SignInFormField.EMAIL]: '',
  [SignInFormField.PASSWORD]: '',
};

export const SignInFormSchema = yup.object().shape({
  [SignInFormField.EMAIL]: yup
    .string()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    .nullable()
    .email('Email không hợp lệ'),
  [SignInFormField.PASSWORD]: yup
    .string()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    .nullable()
    .min(6),
});

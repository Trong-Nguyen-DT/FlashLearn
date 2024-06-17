import { ERROR_MESSAGES } from '@utils';
import * as yup from 'yup';

export type ForgotPasswordFormType = {
  email: string;
  password: string;
};

export enum ForgotPasswordFormField {
  'EMAIL' = 'email',
  'PASSWORD' = 'password',
}

export const forgotPasswordInitialValues = {
  [ForgotPasswordFormField.EMAIL]: '',
  [ForgotPasswordFormField.PASSWORD]: '',
};

export const ForgotPasswordFormSchema = yup.object().shape({
  [ForgotPasswordFormField.EMAIL]: yup
    .string()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    .nullable()
    .email(),
  [ForgotPasswordFormField.PASSWORD]: yup
    .string()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    .nullable(),
});

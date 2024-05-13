import { ERROR_MESSAGES } from '@utils';
import * as yup from 'yup';

export type SignUpFormType = {
  email: string;
  name: string;
  password: string;
};

export enum SignUpFormField {
  'EMAIL' = 'email',
  'NAME' = 'name',
  'PASSWORD' = 'password',
}

export const signUpInitialValues = {
  [SignUpFormField.EMAIL]: '',
  [SignUpFormField.NAME]: '',
  [SignUpFormField.PASSWORD]: '',
};

export const SignUpFormSchema = yup.object().shape({
  [SignUpFormField.EMAIL]: yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED).nullable(),
  [SignUpFormField.NAME]: yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED).nullable(),
  [SignUpFormField.PASSWORD]: yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED).nullable(),
});

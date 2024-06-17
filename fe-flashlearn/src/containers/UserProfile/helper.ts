import { ERROR_MESSAGES, phoneRegExp } from '@utils';
import * as yup from 'yup';

export enum ProfileFormField {
  'NAME' = 'name',
  'PHONE' = 'phone',
  'EMAIL' = 'email',
}

export type ProfileFormType = {
  [ProfileFormField.NAME]: string;
  [ProfileFormField.PHONE]: string;
  [ProfileFormField.EMAIL]: string;
};

export const initialProfileFormValue: ProfileFormType = {
  name: '',
  email: '',
  phone: '',
};

export const ProfileFormSchema = yup.object().shape({
  [ProfileFormField.NAME]: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  [ProfileFormField.EMAIL]: yup
    .string()
    .nullable()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    .email(ERROR_MESSAGES.INVALID_DATA),
  [ProfileFormField.PHONE]: yup
    .string()
    .nullable()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    .matches(phoneRegExp, ERROR_MESSAGES.INVALID_DATA)
    .min(10)
    .max(11),
});

export enum ProfileToastMessage {
  UPDATE_SUCCESS = 'Your profile has been updated successfully.',
}

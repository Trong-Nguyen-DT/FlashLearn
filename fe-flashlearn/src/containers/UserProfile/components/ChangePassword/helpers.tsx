/* eslint-disable react-refresh/only-export-components */
import { ChangePasswordPayload } from '@queries';
import { ERROR_MESSAGES } from '@utils';
import * as Yup from 'yup';

export enum ChangePasswordField {
  NEW_PASSWORD = 'newPassword',
  OLD_PASSWORD = 'oldPassword',
}

export const changePasswordInitValue: ChangePasswordPayload = {
  newPassword: '',
  oldPassword: '',
};

export const ChangePasswordSchema = () =>
  Yup.object().shape({
    newPassword: Yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED),
    oldPassword: Yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED),
  });

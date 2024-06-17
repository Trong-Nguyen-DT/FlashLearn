/* eslint-disable react-refresh/only-export-components */
import { ChangeAvatarPayload } from '@queries';
import { ERROR_MESSAGES } from '@utils';
import * as Yup from 'yup';

export enum ChangeAvatarField {
  UPLOAD_FILE = 'uploadFile',
}

export const changeAvatarInitValue: ChangeAvatarPayload = {
  uploadFile: null,
};

export const ChangeAvatarSchema = () =>
  Yup.object().shape({
    [ChangeAvatarField.UPLOAD_FILE]: Yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED),
  });

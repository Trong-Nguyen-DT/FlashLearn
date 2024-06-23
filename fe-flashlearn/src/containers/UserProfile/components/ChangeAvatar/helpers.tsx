/* eslint-disable react-refresh/only-export-components */
import { ChangeAvatarPayload } from '@queries';

export enum ChangeAvatarField {
  UPLOAD_FILE = 'uploadFile',
}

export const changeAvatarInitValue: ChangeAvatarPayload = {
  uploadFile: null,
};

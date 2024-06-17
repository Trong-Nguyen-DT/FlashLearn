import { UploadFileType } from '@components';

export type UserResponse = {
  id: number;
  email: string;
  name: string;
  phone: string;
  avatar: string;
};

export type ProfilePayload = {
  name: string;
  phone: string;
  email?: string;
};

export type ChangePasswordPayload = {
  newPassword: string;
  oldPassword: string;
};

export type ChangeAvatarPayload = {
  uploadFile: UploadFileType;
};

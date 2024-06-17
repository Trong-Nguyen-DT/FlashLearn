import profileApi from './profileApi';

export * from './type';
export * from './useGetProfile';
export * from './useUpdateProfile';
export * from './useChangePassword';
export * from './useChangeAvatar';

export const ProfileApi = profileApi.create();

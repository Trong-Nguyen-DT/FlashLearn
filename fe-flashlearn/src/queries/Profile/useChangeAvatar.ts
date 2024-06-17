/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '@utils';
import { ChangeAvatarPayload, ProfileApi } from '.';

export function useChangeAvatar(options?: UseMutationOptions<any, Error, ChangeAvatarPayload>) {
  const {
    mutate: onChangeAvatar,
    isLoading,
    isSuccess,
  } = useMutation<any, Error, ChangeAvatarPayload>({
    mutationFn: (payload: ChangeAvatarPayload) =>
      responseWrapper(ProfileApi.changeAvatar, [payload]),
    ...options,
  });

  return {
    onChangeAvatar,
    isLoading,
    isSuccess,
  };
}

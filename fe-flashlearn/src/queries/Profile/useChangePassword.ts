/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ChangePasswordPayload, ProfileApi } from '.';
import { responseWrapper } from '@utils';

export function useChangePassword(options?: UseMutationOptions<any, Error, ChangePasswordPayload>) {
  const {
    mutate: changePassword,
    isLoading,
    isSuccess,
  } = useMutation<any, Error, ChangePasswordPayload>({
    mutationFn: (payload: ChangePasswordPayload) =>
      responseWrapper(ProfileApi.changePassword, [payload]),
    ...options,
  });

  return {
    changePassword,
    isLoading,
    isSuccess,
  };
}

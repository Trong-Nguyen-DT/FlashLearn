/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangePasswordPayload } from './type';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UAMApi } from '.';
import { responseWrapper } from '@utils';

export function useResetPassword(options?: UseMutationOptions<any, Error, ChangePasswordPayload>) {
  const {
    mutate: resetPassword,
    isLoading,
    isSuccess,
  } = useMutation<any, Error, ChangePasswordPayload>({
    mutationFn: (payload: ChangePasswordPayload) =>
      responseWrapper(UAMApi.resetPassword, [payload]),
    ...options,
  });

  return {
    resetPassword,
    isLoading,
    isSuccess,
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { VerifyEmailPayload, VerifyEmailResponse } from './type';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UAMApi } from '.';
import { ApiResponseType, responseWrapper } from '@utils';

export function useVerifyEmail(
  options?: UseMutationOptions<ApiResponseType<VerifyEmailResponse>, Error, VerifyEmailPayload>,
) {
  const {
    mutate: verifyEmail,
    isLoading,
    isSuccess,
  } = useMutation<ApiResponseType<VerifyEmailResponse>, Error, VerifyEmailPayload>({
    mutationFn: (payload: VerifyEmailPayload) => responseWrapper(UAMApi.verifyEmail, [payload]),
    ...options,
  });

  return {
    verifyEmail,
    isLoading,
    isSuccess,
  };
}

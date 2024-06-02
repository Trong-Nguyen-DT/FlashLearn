/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiResponseType, responseWrapper } from '@utils';
import { LearnApi } from '.';
import { updateLearnProgressPayload } from './type';

export function useUpdateLearnProgress(
  options?: UseMutationOptions<ApiResponseType<any>, Error, updateLearnProgressPayload>,
) {
  const {
    mutate: onUpdateLearnProgress,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<any>, Error, updateLearnProgressPayload>({
    mutationFn: (payload: updateLearnProgressPayload) =>
      responseWrapper(LearnApi.updateLearnProgress, [payload]),
    ...options,
  });

  return {
    onUpdateLearnProgress,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

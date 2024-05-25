/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '@utils';
import { StudentApi } from '.';

export function useLeaveCourse(options?: UseMutationOptions<any, Error, { id: number }>) {
  const {
    mutate: onLeaveCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, { id: number }>({
    mutationFn: (payload: { id: number }) => responseWrapper(StudentApi.leaveCourse, [payload]),
    ...options,
  });

  return {
    onLeaveCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

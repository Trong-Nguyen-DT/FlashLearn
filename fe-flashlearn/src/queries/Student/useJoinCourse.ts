/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '@utils';
import { StudentApi } from '.';

export function useJoinCourse(options?: UseMutationOptions<any, Error, { id: number }>) {
  const {
    mutate: onJoinCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, { id: number }>({
    mutationFn: (payload: { id: number }) => responseWrapper(StudentApi.joinCourse, [payload]),
    ...options,
  });

  return {
    onJoinCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

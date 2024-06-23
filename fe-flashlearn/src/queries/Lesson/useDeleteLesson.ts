/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { LessonApi } from '.';
import { responseWrapper } from '@utils';

export function useDeleteLesson(options?: UseMutationOptions<any, Error, { id: string }>) {
  const {
    mutate: onDeleteLesson,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, { id: string }>({
    mutationFn: (payload: { id: string }) => responseWrapper(LessonApi.deleteLesson, [payload]),
    ...options,
  });

  return {
    onDeleteLesson,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

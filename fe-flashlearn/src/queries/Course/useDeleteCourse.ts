/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CourseApi } from '.';
import { responseWrapper } from '@utils';

export function useDeleteCourse(options?: UseMutationOptions<any, Error, { id: string }>) {
  const {
    mutate: onDeleteCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, { id: string }>({
    mutationFn: (payload: { id: string }) => responseWrapper(CourseApi.deleteCourse, [payload]),
    ...options,
  });

  return {
    onDeleteCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

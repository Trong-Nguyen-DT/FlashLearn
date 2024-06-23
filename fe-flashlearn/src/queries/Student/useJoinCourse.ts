/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiResponseType, responseWrapper } from '@utils';
import { StudentApi } from '.';
import { CourseResponse } from '@queries/Course';

export function useJoinCourse(
  options?: UseMutationOptions<ApiResponseType<CourseResponse>, Error, { id: number }>,
) {
  const {
    mutate: onJoinCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<CourseResponse>, Error, { id: number }>({
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

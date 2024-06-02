/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiResponseType, responseWrapper } from '@utils';
import { StudentApi } from '.';
import { CourseResponse } from '@queries/Course';

export function useJoinCourseByCode(
  options?: UseMutationOptions<ApiResponseType<CourseResponse>, Error, { code: string }>,
) {
  const {
    mutate: onJoinCourseByCode,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<CourseResponse>, Error, { code: string }>({
    mutationFn: (payload: { code: string }) =>
      responseWrapper(StudentApi.joinCourseByCode, [payload]),
    ...options,
  });

  return {
    onJoinCourseByCode,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

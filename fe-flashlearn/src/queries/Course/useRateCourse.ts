/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { RateCoursePayload, CourseResponse } from './type';
import { ApiResponseType, responseWrapper } from '@utils';
import { CourseApi } from '.';

export function useRateCourse(
  options?: UseMutationOptions<ApiResponseType<CourseResponse>, Error, RateCoursePayload>,
) {
  const {
    mutate: onRateCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<CourseResponse>, Error, RateCoursePayload>({
    mutationFn: (payload: RateCoursePayload) => responseWrapper(CourseApi.rateCourse, [payload]),
    ...options,
  });

  return {
    onRateCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

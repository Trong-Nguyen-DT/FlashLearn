/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CoursePayload, CourseResponse } from './type';
import { ApiResponseType, responseWrapper } from '@utils';
import { CourseApi } from '.';

export function useAddCourse(
  options?: UseMutationOptions<ApiResponseType<CourseResponse>, Error, CoursePayload>,
) {
  const {
    mutate: onAddNewCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<CourseResponse>, Error, CoursePayload>({
    mutationFn: (payload: CoursePayload) => responseWrapper(CourseApi.createCourse, [payload]),
    ...options,
  });

  return {
    onAddNewCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

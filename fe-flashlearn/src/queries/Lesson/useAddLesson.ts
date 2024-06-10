/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiResponseType, responseWrapper } from '@utils';
import { LessonApi, LessonPayload, LessonResponse } from '.';

export function useAddLesson(
  options?: UseMutationOptions<ApiResponseType<LessonResponse>, Error, LessonPayload>,
) {
  const {
    mutate: onAddNewLesson,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<LessonResponse>, Error, LessonPayload>({
    mutationFn: (payload: LessonPayload) => responseWrapper(LessonApi.createLesson, [payload]),
    ...options,
  });

  return {
    onAddNewLesson,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiResponseType, responseWrapper } from '@utils';
import { LessonApi, LessonPayload, LessonResponse } from '.';

export function useUpdateLesson(
  options?: UseMutationOptions<ApiResponseType<LessonResponse>, Error, LessonPayload>,
) {
  const {
    mutate: onUpdateLesson,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<LessonResponse>, Error, LessonPayload>({
    mutationFn: (payload: LessonPayload) => responseWrapper(LessonApi.updateLesson, [payload]),
    ...options,
  });

  return {
    onUpdateLesson,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

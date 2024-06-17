/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiResponseType, responseWrapper } from '@utils';
import { VocabularyApi } from '.';
import { CreateVocabulariesResponse, VocabulariesOfLessonPayload } from './type';

export function useUpdateVocabulariesOfLesson(
  options?: UseMutationOptions<
    ApiResponseType<CreateVocabulariesResponse>,
    Error,
    VocabulariesOfLessonPayload
  >,
) {
  const {
    mutate: onUpdateVocabularyOfLesson,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<CreateVocabulariesResponse>, Error, VocabulariesOfLessonPayload>({
    mutationFn: (payload: VocabulariesOfLessonPayload) =>
      responseWrapper(VocabularyApi.updateVocabulariesOfLesson, [payload]),
    ...options,
  });

  return {
    onUpdateVocabularyOfLesson,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

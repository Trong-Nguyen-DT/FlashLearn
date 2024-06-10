/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiResponseType, responseWrapper } from '@utils';
import { VocabularyApi } from '.';
import { CreateVocabulariesResponse, VocabulariesOfLessonPayload } from './type';

export function useAddVocabulariesOfLesson(
  options?: UseMutationOptions<
    ApiResponseType<CreateVocabulariesResponse>,
    Error,
    VocabulariesOfLessonPayload
  >,
) {
  const {
    mutate: onAddVocabularyOfLesson,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<CreateVocabulariesResponse>, Error, VocabulariesOfLessonPayload>({
    mutationFn: (payload: VocabulariesOfLessonPayload) =>
      responseWrapper(VocabularyApi.addVocabulariesOfLesson, [payload]),
    ...options,
  });

  return {
    onAddVocabularyOfLesson,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiResponseType, responseWrapper } from '@utils';
import { VocabularyApi } from '.';
import { VocabulariesPayload, CreateVocabulariesResponse } from './type';

export function useAddVocabularies(
  options?: UseMutationOptions<
    ApiResponseType<CreateVocabulariesResponse>,
    Error,
    VocabulariesPayload
  >,
) {
  const {
    mutate: onAddNewVocabulary,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<CreateVocabulariesResponse>, Error, VocabulariesPayload>({
    mutationFn: (payload: VocabulariesPayload) =>
      responseWrapper(VocabularyApi.createVocabularies, [payload]),
    ...options,
  });

  return {
    onAddNewVocabulary,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

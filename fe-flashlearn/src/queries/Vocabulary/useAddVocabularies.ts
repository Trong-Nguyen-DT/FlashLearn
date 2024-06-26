/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiResponseType, responseWrapper } from '@utils';
import { VocabularyApi } from '.';
import { VocabulariesPayload, VocabularyResponse } from './type';

export function useAddVocabularies(
  options?: UseMutationOptions<ApiResponseType<VocabularyResponse[]>, Error, VocabulariesPayload>,
) {
  const {
    mutate: onAddNewVocabulary,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<VocabularyResponse[]>, Error, VocabulariesPayload>({
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

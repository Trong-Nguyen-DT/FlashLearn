/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { VocabularyPayload, VocabularyResponse } from './type';
import { ApiResponseType, responseWrapper } from '@utils';
import { VocabularyApi } from '.';

export function useAddVocabulary(
  options?: UseMutationOptions<ApiResponseType<VocabularyResponse>, Error, VocabularyPayload>,
) {
  const {
    mutate: onAddNewVocabulary,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<VocabularyResponse>, Error, VocabularyPayload>({
    mutationFn: (payload: VocabularyPayload) =>
      responseWrapper(VocabularyApi.createVocabulary, [payload]),
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

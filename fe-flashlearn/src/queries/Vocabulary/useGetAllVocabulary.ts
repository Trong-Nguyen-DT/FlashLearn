import { ApiKey } from '@queries/keys';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { PaginationResponseType, responseWrapper } from '@utils';
import { VocabularyApi, VocabularyResponse } from '.';

export function useGetAllVocabulary(
  options?: UseQueryOptions<PaginationResponseType<VocabularyResponse>, Error>,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllVocabulary,
  } = useQuery<PaginationResponseType<VocabularyResponse>, Error>([ApiKey.VOCABULARY], {
    queryFn: () => {
      return responseWrapper<PaginationResponseType<VocabularyResponse>>(
        VocabularyApi.getAllVocabulary,
        [],
      );
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateVocabularyList = () => queryClient.invalidateQueries([ApiKey.VOCABULARY]);

  const { data: vocabulary = [], page } = data?.data || {};

  return {
    vocabulary,
    page,
    error,
    isError,
    isFetching,
    onGetAllVocabulary,
    handleInvalidateVocabularyList,
  };
}

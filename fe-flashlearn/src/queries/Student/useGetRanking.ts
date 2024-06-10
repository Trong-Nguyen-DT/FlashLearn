import { ApiKey } from '@queries/keys';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { PaginationResponseType, isEmpty, responseWrapper } from '@utils';
import { useState } from 'react';
import { StudentApi } from '.';
import { GetRankParam, GetRankResponse } from './type';

export function useGetRanking(
  options?: UseQueryOptions<PaginationResponseType<GetRankResponse>, Error>,
) {
  const [params, setParams] = useState<GetRankParam>();

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetRankings,
  } = useQuery<PaginationResponseType<GetRankResponse>, Error>([ApiKey.RANK, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<GetRankResponse>>(
        StudentApi.getRankingList,
        params,
      );
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateRanking = () => queryClient.invalidateQueries([ApiKey.RANK]);

  const { data: rankings = [], page } = data?.data || {};

  return {
    params,
    rankings,
    page,
    error,
    isError,
    isFetching,
    onGetRankings,
    setParams,
    handleInvalidateRanking,
  };
}

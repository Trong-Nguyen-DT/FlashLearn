// import { ApiKey } from '@queries/keys';
// import { isEmpty, responseWrapper } from '@shared';
// import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
// import { useState } from 'react';
// import { ProductApi } from '.';
// import { TopSellsParams, TopSellsResponse } from './type';

// export function useGetTopSells(options?: UseQueryOptions<TopSellsResponse, Error>) {
//   const [params, setParams] = useState<TopSellsParams>({});

//   const {
//     data,
//     error,
//     isError,
//     isFetching,
//     refetch: onGetTopSells,
//   } = useQuery<TopSellsResponse, Error>([ApiKey.TOP_SELLS, params], {
//     queryFn: (query) => {
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       return responseWrapper<TopSellsResponse>(ProductApi.getTopSells, [params]);
//     },
//     notifyOnChangeProps: ['data', 'isFetching'],
//     keepPreviousData: true,
//     enabled: !isEmpty(params),
//     ...options,
//   });

//   const queryClient = useQueryClient();

//   const handleInvalidateTopSellsList = () => queryClient.invalidateQueries([ApiKey.TOP_SELLS]);

//   return {
//     topSells: data,
//     params,
//     error,
//     isError,
//     isFetching,
//     onGetTopSells,
//     setParams,
//     handleInvalidateTopSellsList,
//   };
// }

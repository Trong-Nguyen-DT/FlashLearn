// import { ApiResponseType, Callback, isEmpty, responseWrapper } from '@shared';
// import { QueryFunction, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
// import { useEffect } from 'react';
// import { ApiKey } from '../keys';
// import { ProductResponse } from './type';
// import { ProductApi } from '.';

// export function useGetProductDetail(
//   options?: UseQueryOptions<ApiResponseType<ProductResponse>, Error, ProductResponse> & {
//     id: string;
//     storeId?: string;
//     onSuccessCallback?: Callback;
//     onErrorCallback?: Callback;
//   },
// ) {
//   const handleGetProductDetail: QueryFunction<ApiResponseType<ProductResponse>> = () =>
//     responseWrapper<ApiResponseType<ProductResponse>>(ProductApi.getProductDetail, [
//       options.id,
//       options.storeId,
//     ]);

//   const {
//     data,
//     error,
//     isError,
//     isFetching: isLoading,
//     isSuccess,
//   } = useQuery<ApiResponseType<ProductResponse>, Error, ProductResponse>(
//     [ApiKey.PRODUCT, options.id, options.storeId],
//     {
//       queryFn: handleGetProductDetail,
//       notifyOnChangeProps: ['data', 'isFetching'],
//       enabled: !isEmpty(options.id),
//       ...options,
//     },
//   );

//   useEffect(() => {
//     if (data && isSuccess) {
//       if (options?.onSuccessCallback) {
//         options.onSuccessCallback(data);
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [data, isSuccess]);

//   useEffect(() => {
//     if (isError) {
//       if (options?.onErrorCallback) {
//         options.onErrorCallback(error);
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isError]);

//   const queryClient = useQueryClient();

//   const handleInvalidateProductDetail = () =>
//     queryClient.invalidateQueries([ApiKey.PRODUCT, options.id, options.storeId]);

//   return {
//     productDetail: data,
//     isError,
//     error,
//     isLoading: isLoading,
//     isSuccess,
//     handleInvalidateProductDetail,
//   };
// }

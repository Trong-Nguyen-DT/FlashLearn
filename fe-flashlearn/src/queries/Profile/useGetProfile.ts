import { QueryFunction, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ApiKey } from '../keys';
import { UserResponse } from '.';
import { ProfileApi } from '.';
import { ApiResponseType, Callback, responseWrapper } from '@utils';

export function useGetProfile(
  options?: UseQueryOptions<ApiResponseType<UserResponse>, Error, UserResponse> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const handleGetProfile: QueryFunction<ApiResponseType<UserResponse>> = () =>
    responseWrapper<ApiResponseType<UserResponse>>(ProfileApi.getProfile);

  const {
    data,
    error,
    isError,
    isFetching: isLoading,
    isSuccess,
  } = useQuery<ApiResponseType<UserResponse>, Error, UserResponse>([ApiKey.USERS], {
    queryFn: handleGetProfile,
    notifyOnChangeProps: ['data', 'isFetching'],
    select: (data) => data.data.objectData,
    ...options,
  });

  useEffect(() => {
    if (data && isSuccess) {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      if (options?.onErrorCallback) {
        options.onErrorCallback(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const queryClient = useQueryClient();

  const handleInvalidateProfile = () => queryClient.invalidateQueries([ApiKey.USERS]);

  return {
    profile: data,
    isError,
    error,
    isLoading: isLoading,
    isSuccess,
    handleInvalidateProfile,
  };
}

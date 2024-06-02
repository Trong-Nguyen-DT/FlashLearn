import { QueryFunction, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiResponseType, Callback, responseWrapper } from '@utils';
import { useEffect } from 'react';
import { CourseApi } from '.';
import { ApiKey } from '../keys';
import { CourseResponse } from './type';

export function useGetCourseDetail(
  options?: UseQueryOptions<ApiResponseType<CourseResponse>, Error, CourseResponse> & {
    id?: string;
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const handleGetCourseDetail: QueryFunction<ApiResponseType<CourseResponse>> = () =>
    responseWrapper<ApiResponseType<CourseResponse>>(CourseApi.getCourseDetail, [options?.id]);

  const {
    data,
    error,
    isError,
    isFetching: isLoading,
    isSuccess,
  } = useQuery<ApiResponseType<CourseResponse>, Error, CourseResponse>(
    [ApiKey.COURSE, options.id],
    {
      queryFn: handleGetCourseDetail,
      notifyOnChangeProps: ['data', 'isFetching'],
      enabled: !!options?.id,
      select: (data) => data.data.data,
      ...options,
    },
  );

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

  const handleInvalidateCourseDetail = () =>
    queryClient.invalidateQueries([ApiKey.COURSE, options?.id]);

  return {
    courseDetail: data,
    isError,
    error,
    isLoading: isLoading,
    isSuccess,
    handleInvalidateCourseDetail,
  };
}

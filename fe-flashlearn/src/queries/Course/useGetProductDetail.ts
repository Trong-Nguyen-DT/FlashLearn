import { QueryFunction, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ApiKey } from '../keys';
import { CourseResponse } from './type';
import { CourseApi } from '.';
import { ApiResponseType, Callback, isEmpty, responseWrapper } from '@utils';

export function useGetCourseDetail(
  options?: UseQueryOptions<ApiResponseType<CourseResponse>, Error, CourseResponse> & {
    id: string;
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const handleGetCourseDetail: QueryFunction<ApiResponseType<CourseResponse>> = () =>
    responseWrapper<ApiResponseType<CourseResponse>>(CourseApi.getCourseDetail, [options.id]);

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
      enabled: !isEmpty(options.id),
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
    queryClient.invalidateQueries([ApiKey.COURSE, options.id]);

  return {
    courseDetail: data,
    isError,
    error,
    isLoading: isLoading,
    isSuccess,
    handleInvalidateCourseDetail,
  };
}

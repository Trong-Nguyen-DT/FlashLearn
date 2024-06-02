import { QueryFunction, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiResponseType, Callback, responseWrapper } from '@utils';
import { useEffect } from 'react';
import { ApiKey } from '../keys';
import { LessonApi, LessonResponse } from '.';

export function useGetLessonDetail(
  options?: UseQueryOptions<ApiResponseType<LessonResponse>, Error, LessonResponse> & {
    id?: string;
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const handleGetLessonDetail: QueryFunction<ApiResponseType<LessonResponse>> = () =>
    responseWrapper<ApiResponseType<LessonResponse>>(LessonApi.getLessonDetail, [options?.id]);

  const {
    data,
    error,
    isError,
    isFetching: isLoading,
    isSuccess,
  } = useQuery<ApiResponseType<LessonResponse>, Error, LessonResponse>(
    [ApiKey.LESSON_DETAIL, options?.id],
    {
      queryFn: handleGetLessonDetail,
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

  const handleInvalidateLessonDetail = () =>
    queryClient.invalidateQueries([ApiKey.LESSON_DETAIL, options?.id]);

  return {
    lessonDetail: data,
    isError,
    error,
    isLoading: isLoading,
    isSuccess,
    handleInvalidateLessonDetail,
  };
}

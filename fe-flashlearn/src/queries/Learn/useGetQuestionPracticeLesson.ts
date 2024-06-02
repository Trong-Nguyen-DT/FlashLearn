import { QueryFunction, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiResponseType, Callback, responseWrapper } from '@utils';
import { useEffect } from 'react';
import { ApiKey } from '../keys';
import { LearnQuestionResponse } from './type';
import { LearnApi } from '.';

export function useGetQuestionPracticeLesson(
  options?: UseQueryOptions<
    ApiResponseType<LearnQuestionResponse>,
    Error,
    LearnQuestionResponse
  > & {
    id?: string;
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const handleGetQuestionLearn: QueryFunction<ApiResponseType<LearnQuestionResponse>> = () =>
    responseWrapper<ApiResponseType<LearnQuestionResponse>>(LearnApi.getQuestionPracticeLesson, [
      options?.id,
    ]);

  const {
    data,
    error,
    isError,
    isFetching: isLoading,
    isSuccess,
  } = useQuery<ApiResponseType<LearnQuestionResponse>, Error, LearnQuestionResponse>(
    [ApiKey.PRACTICE_LESSON, options.id],
    {
      queryFn: handleGetQuestionLearn,
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

  const handleInvalidateQuestionPracticeLesson = () =>
    queryClient.invalidateQueries([ApiKey.PRACTICE_LESSON, options?.id]);

  return {
    question: data,
    isError,
    error,
    isLoading: isLoading,
    isSuccess,
    handleInvalidateQuestionPracticeLesson,
  };
}

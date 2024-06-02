import { ApiKey } from '@queries/keys';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { PaginationResponseType, responseWrapper } from '@utils';
import { LessonResponse } from './type';
import { LessonApi } from '.';

export function useGetLesson(
  options?: UseQueryOptions<PaginationResponseType<LessonResponse>, Error> & {
    courseId?: string;
  },
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllLessons,
  } = useQuery<PaginationResponseType<LessonResponse>, Error>([ApiKey.LESSON, options?.courseId], {
    queryFn: () => {
      return responseWrapper<PaginationResponseType<LessonResponse>>(LessonApi.getLessonList, [
        options?.courseId,
      ]);
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !!options?.courseId,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateLessonList = () =>
    queryClient.invalidateQueries([ApiKey.LESSON, options?.courseId]);

  const { data: lessons = [], page } = data?.data || {};

  return {
    lessons,
    page,
    error,
    isError,
    isFetching,
    onGetAllLessons,
    handleInvalidateLessonList,
  };
}

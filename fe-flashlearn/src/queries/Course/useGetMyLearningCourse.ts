import { ApiKey } from '@queries/keys';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { PaginationResponseType, responseWrapper } from '@utils';
import { CourseApi, CourseResponse } from '.';

export function useGetMyLearningCourse(
  options?: UseQueryOptions<PaginationResponseType<CourseResponse>, Error>,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllCourses,
  } = useQuery<PaginationResponseType<CourseResponse>, Error>([ApiKey.MY_LEARNING_COURSE], {
    queryFn: () => {
      return responseWrapper<PaginationResponseType<CourseResponse>>(CourseApi.getCourseList);
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateMyLearningCourseList = () =>
    queryClient.invalidateQueries([ApiKey.MY_LEARNING_COURSE]);

  const { arrayData: courses = [], page } = data?.data || {};

  return {
    courses,
    page,
    error,
    isError,
    isFetching,
    onGetAllCourses,
    handleInvalidateMyLearningCourseList,
  };
}

import { ApiKey } from '@queries/keys';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { PaginationResponseType, responseWrapper } from '@utils';
import { CourseApi, CourseResponse } from '.';

export function useGetMyTeachingCourse(
  options?: UseQueryOptions<PaginationResponseType<CourseResponse>, Error>,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllCourses,
  } = useQuery<PaginationResponseType<CourseResponse>, Error>([ApiKey.MY_TEACHING_COURSE], {
    queryFn: () => {
      return responseWrapper<PaginationResponseType<CourseResponse>>(
        CourseApi.getMyTeachingCourses,
      );
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: true,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateMyTeachingCourseList = () =>
    queryClient.invalidateQueries([ApiKey.MY_TEACHING_COURSE]);

  const { arrayData: courses = [], page } = data?.data || {};

  return {
    courses,
    page,
    error,
    isError,
    isFetching,
    onGetAllCourses,
    handleInvalidateMyTeachingCourseList,
  };
}

import { useState } from 'react';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiKey } from '@queries/keys';
import { CourseResponse, CourseApi } from '.';
import { TableParams } from '@components';
import { PaginationResponseType, isEmpty, responseWrapper } from '@utils';

export function useGetAllCourse(
  options?: UseQueryOptions<PaginationResponseType<CourseResponse>, Error>,
) {
  const [params, setParams] = useState<TableParams>({});

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllCourses,
  } = useQuery<PaginationResponseType<CourseResponse>, Error>([ApiKey.COURSE, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<CourseResponse>>(
        CourseApi.getCourseList,
        params,
      );
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateCourseList = () => queryClient.invalidateQueries([ApiKey.COURSE]);

  const { data: courses = [], page } = data?.data || {};

  return {
    params,
    courses,
    page,
    error,
    isError,
    isFetching,
    onGetAllCourses,
    setParams,
    handleInvalidateCourseList,
  };
}

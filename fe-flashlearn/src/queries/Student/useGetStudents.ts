import { ApiKey } from '@queries/keys';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { PaginationResponseType, responseWrapper } from '@utils';
import { StudentResponse } from './type';
import { StudentApi } from '.';

export function useGetStudents(
  options?: UseQueryOptions<PaginationResponseType<StudentResponse>, Error> & {
    courseId?: string;
  },
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllStudents,
  } = useQuery<PaginationResponseType<StudentResponse>, Error>([ApiKey.STUDENT, options?.courseId], {
    queryFn: () => {
      return responseWrapper<PaginationResponseType<StudentResponse>>(StudentApi.getStudentList, [
        options?.courseId,
      ]);
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !!options?.courseId,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateStudentList = () =>
    queryClient.invalidateQueries([ApiKey.STUDENT, options?.courseId]);

  const { arrayData: students = [], page } = data?.data || {};

  return {
    students,
    page,
    error,
    isError,
    isFetching,
    onGetAllStudents,
    handleInvalidateStudentList,
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AddStudentPayload } from './type';
import { ApiResponseType, responseWrapper } from '@utils';
import { StudentApi } from '.';

export function useAddStudents(
  options?: UseMutationOptions<ApiResponseType<any>, Error, AddStudentPayload>,
) {
  const {
    mutate: onAddNewStudents,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<any>, Error, AddStudentPayload>({
    mutationFn: (payload: AddStudentPayload) => responseWrapper(StudentApi.addStudent, [payload]),
    ...options,
  });

  return {
    onAddNewStudents,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

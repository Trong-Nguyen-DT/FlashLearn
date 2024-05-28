/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '@utils';
import { RemoveStudentPayload } from './type';
import { StudentApi } from '.';

export function useRemoveStudent(options?: UseMutationOptions<any, Error, RemoveStudentPayload>) {
  const {
    mutate: onDeleteStudent,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, RemoveStudentPayload>({
    mutationFn: (payload: RemoveStudentPayload) =>
      responseWrapper(StudentApi.deleteStudent, [payload]),
    ...options,
  });

  return {
    onDeleteStudent,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AddStudentPayload } from './type';
import { ApiResponseType, responseWrapper } from '@utils';
import { StudentApi } from '.';

export function useInviteStudents(
  options?: UseMutationOptions<ApiResponseType<any>, Error, AddStudentPayload>,
) {
  const {
    mutate: onInviteStudents,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<any>, Error, AddStudentPayload>({
    mutationFn: (payload: AddStudentPayload) =>
      responseWrapper(StudentApi.inviteStudent, [payload]),
    ...options,
  });

  return {
    onInviteStudents,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}

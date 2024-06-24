/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AddStudentsPayload } from './type';
import { ApiResponseType, responseWrapper } from '@utils';
import { StudentApi } from '.';

export function useInviteStudents(
  options?: UseMutationOptions<ApiResponseType<any>, Error, AddStudentsPayload>,
) {
  const {
    mutate: onInviteStudents,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<any>, Error, AddStudentsPayload>({
    mutationFn: (payload: AddStudentsPayload) =>
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

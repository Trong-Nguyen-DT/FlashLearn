import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ProfilePayload, UserResponse } from './type';
import { ProfileApi } from '.';
import { ApiResponseType, responseWrapper } from '@utils';

export function useUpdateProfile(
  options?: UseMutationOptions<ApiResponseType<UserResponse>, Error, ProfilePayload>,
) {
  const { mutate: updateProfile, isLoading } = useMutation<
    ApiResponseType<UserResponse>,
    Error,
    ProfilePayload
  >({
    mutationFn: (payload: ProfilePayload) => responseWrapper(ProfileApi.updateProfile, [payload]),
    ...options,
  });

  return {
    updateProfile,
    isLoading,
  };
}

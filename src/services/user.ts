import { createStandardMutationHook, createStandardQueryHook, QUERY_KEYS } from '@/hooks/utils';
import { UpdateUserDto, User } from '@/types/user';
import { useQueryClient } from '@tanstack/react-query';
import { httpClient } from './http-client';

// API functions
const userApi = {
  getProfile: (): Promise<User> =>
    httpClient.get<User>('/v1/auth/me', 'Failed to get profile'),

  updateProfile: (data: UpdateUserDto): Promise<User> =>
    httpClient.put<User>('/v1/users/profile/me', data, 'Failed to update profile'),
    
  updateAvatar: (formData: FormData): Promise<{ avatarUrl: string }> =>
    httpClient.postFormData('/v1/users/avatar', formData, 'Failed to upload avatar'),
};

// Hooks

export function useUserProfile() {
  return createStandardQueryHook(
    QUERY_KEYS.user.profile(),
    userApi.getProfile,
    {
      context: 'User Profile',
      errorMessage: 'Failed to load profile',
    }
  )();
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return createStandardMutationHook(
    userApi.updateProfile,
    {
      context: 'Update Profile',
      errorMessage: 'Failed to update profile',
      onSuccess: (data) => {
        queryClient.setQueryData(QUERY_KEYS.user.profile(), data);
        queryClient.setQueryData(QUERY_KEYS.auth.currentUser(), data);
      },
    }
  )();
}


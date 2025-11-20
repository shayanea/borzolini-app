import { httpClient } from './http-client';
import { User, UpdateUserDto } from '@/types/user';
import { createStandardMutationHook, createStandardQueryHook, QUERY_KEYS } from '@/hooks/utils';
import { useQueryClient } from '@tanstack/react-query';

// API functions
const userApi = {
  getProfile: (): Promise<User> =>
    httpClient.get<User>('/auth/me', 'Failed to get profile'),

  updateProfile: (data: UpdateUserDto): Promise<User> =>
    httpClient.put<User>('/users/profile/me', data, 'Failed to update profile'),
    
  updateAvatar: (formData: FormData): Promise<{ avatarUrl: string }> =>
    httpClient.postFormData('/users/avatar', formData, 'Failed to upload avatar'),
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


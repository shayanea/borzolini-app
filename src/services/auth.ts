import { httpClient, HttpRequestError } from './http-client';
import { TokenService } from './token-service';
import { User, CreateUserDto } from '@/types/user';
import { useQueryClient } from '@tanstack/react-query';
import {
  QUERY_KEYS,
  QUERY_CONFIG,
  createStandardMutationHook,
  createStandardQueryHook,
} from '@/hooks/utils';

export interface LoginData {
  email: string;
  password?: string;
  token?: string; // For Google login
}

export interface RegisterData extends CreateUserDto {
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

// API functions
const authApi = {
  login: (data: LoginData): Promise<AuthResponse> =>
    httpClient.post<AuthResponse>('/auth/login', data, 'Login failed'),

  register: (data: RegisterData): Promise<AuthResponse> =>
    httpClient.post<AuthResponse>('/auth/register', data, 'Registration failed'),

  getCurrentUser: async (): Promise<User | null> => {
    try {
      return await httpClient.get<User>('/auth/me', 'Failed to get user info');
    } catch (error) {
      if (error instanceof HttpRequestError && error.isUnauthorized()) {
        const isDev =
          __DEV__ || process.env.NODE_ENV === 'development';

        if (isDev) {
          await TokenService.clearTokens();
        }

        console.log('ℹ️ No authenticated session detected. Returning null user.');
        return null;
      }

      throw error;
    }
  },

  logout: (): Promise<void> => httpClient.post('/auth/logout'),
};

// Helper function to handle auth success
const handleAuthSuccess = async (
  data: AuthResponse,
  queryClient: ReturnType<typeof useQueryClient>,
  action: string
) => {
  // In development: Tokens are returned in response body, store them for Authorization header
  // In production: Tokens are only in cookies, no need to store them
  const isDev =
    __DEV__ ||
    process.env.NODE_ENV === 'development';
  
  if (isDev && data.accessToken && data.refreshToken) {
    console.log(`🔐 [DEV] Storing tokens after successful ${action}`);
    await TokenService.setTokens(data.accessToken, data.refreshToken);
  } else if (!isDev) {
    console.log(`🍪 [PROD] Using cookie-based authentication (tokens in cookies)`);
  } else {
    console.log(`⚠️ [DEV] No tokens received in ${action} response - may use cookies`);
  }

  queryClient.setQueryData(QUERY_KEYS.auth.currentUser(), data.user);
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.currentUser() });
};

// Hooks

export function useLogin() {
  const queryClient = useQueryClient();
  return createStandardMutationHook(
    authApi.login,
    {
      context: 'Login',
      errorMessage: 'Login failed',
      onSuccess: (data) => handleAuthSuccess(data, queryClient, 'login'),
      invalidateQueries: [QUERY_KEYS.auth.currentUser()],
    }
  )();
}

export function useRegister() {
  const queryClient = useQueryClient();
  return createStandardMutationHook(
    authApi.register,
    {
      context: 'Register',
      errorMessage: 'Registration failed',
      onSuccess: (data) => handleAuthSuccess(data, queryClient, 'registration'),
      invalidateQueries: [QUERY_KEYS.auth.currentUser()],
    }
  )();
}

export function useLogout() {
  const queryClient = useQueryClient();
  return createStandardMutationHook(
    authApi.logout,
    {
      context: 'Logout',
      errorMessage: 'Logout failed',
      onSuccess: async () => {
        await TokenService.clearTokens();
        queryClient.setQueryData(QUERY_KEYS.auth.currentUser(), null);
        queryClient.clear();
      },
    }
  )();
}

export function useCurrentUser() {
  return createStandardQueryHook<User | null>(
    QUERY_KEYS.auth.currentUser(),
    authApi.getCurrentUser,
    {
      context: 'Current User',
      errorMessage: 'Failed to get user info',
      retry: QUERY_CONFIG.RETRY.NONE,
    }
  )();
}


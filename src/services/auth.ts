import {
  AuthResponse,
  ForgotPasswordData,
  LoginData,
  RegisterData,
} from '@/types/auth';
import { HttpRequestError, httpClient } from './http-client';
import {
  QUERY_CONFIG,
  QUERY_KEYS,
  createStandardMutationHook,
  createStandardQueryHook,
} from '@/hooks/utils';

import { TokenService } from './token-service';
import { User } from '@/types/user';
import { useQueryClient } from '@tanstack/react-query';

const isDevEnvironment = () => {
  if (__DEV__) {
    return true;
  }
  return process.env.NODE_ENV === 'development';
};

// API functions
const authApi = {
  login: (data: LoginData): Promise<AuthResponse> =>
    httpClient.post<AuthResponse>('/auth/login', data, 'Login failed'),

  register: (data: RegisterData): Promise<AuthResponse> =>
    httpClient.post<AuthResponse>(
      '/auth/register',
      data,
      'Registration failed'
    ),

  forgotPassword: (data: ForgotPasswordData): Promise<void> =>
    httpClient.post('/auth/forgot-password', data, 'Password reset failed'),

  getCurrentUser: async (): Promise<User | null> => {
    try {
      return await httpClient.get<User>('/auth/me', 'Failed to get user info');
    } catch (error) {
      if (error instanceof HttpRequestError) {
        if (error.isUnauthorized()) {
          const isDev = isDevEnvironment();

          if (isDev) {
            await TokenService.clearTokens();
          }

          console.log(
            'ℹ️ No authenticated session detected. Returning null user.'
          );
          return null;
        }
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
  const isDev = isDevEnvironment();

  if (!isDev) {
    console.log(
      `🍪 [PROD] Using cookie-based authentication (tokens in cookies)`
    );
    return;
  }

  if (!data.accessToken) {
    console.log(
      `⚠️ [DEV] No access token received in ${action} response - may use cookies`
    );
    return;
  }

  if (!data.refreshToken) {
    console.log(
      `⚠️ [DEV] No refresh token received in ${action} response - may use cookies`
    );
    return;
  }

  console.log(`🔐 [DEV] Storing tokens after successful ${action}`);
  await TokenService.setTokens(data.accessToken, data.refreshToken);

  queryClient.setQueryData(QUERY_KEYS.auth.currentUser(), data.user);
  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.currentUser() });
};

// Hooks

export function useLogin() {
  const queryClient = useQueryClient();
  return createStandardMutationHook(authApi.login, {
    context: 'Login',
    errorMessage: 'Login failed',
    onSuccess: data => handleAuthSuccess(data, queryClient, 'login'),
    invalidateQueries: [QUERY_KEYS.auth.currentUser()],
  })();
}

export function useRegister() {
  const queryClient = useQueryClient();
  return createStandardMutationHook(authApi.register, {
    context: 'Register',
    errorMessage: 'Registration failed',
    onSuccess: data => handleAuthSuccess(data, queryClient, 'registration'),
    invalidateQueries: [QUERY_KEYS.auth.currentUser()],
  })();
}

export function useForgotPassword() {
  return createStandardMutationHook(authApi.forgotPassword, {
    context: 'Forgot Password',
    errorMessage: 'Password reset failed',
  })();
}

export function useLogout() {
  const queryClient = useQueryClient();
  return createStandardMutationHook(authApi.logout, {
    context: 'Logout',
    errorMessage: 'Logout failed',
    onSuccess: async () => {
      await TokenService.clearTokens();
      queryClient.setQueryData(QUERY_KEYS.auth.currentUser(), null);
      queryClient.clear();
    },
  })();
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

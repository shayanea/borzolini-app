import { useMemo, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { TokenService } from '@/services/token-service';
import {
  useCurrentUser,
  useLogin,
  useLogout,
  useRegister,
} from '@/services/auth';
import { QUERY_KEYS } from './utils';

/**
 * Hook to check token validity
 * In development: Checks stored tokens
 * In production: Always returns true (relies on cookies)
 */
export function useTokenAuth() {
  const queryClient = useQueryClient();
  const [hasTokens, setHasTokens] = useState<boolean | null>(null);

  useEffect(() => {
    const checkTokens = async () => {
      const isDev = __DEV__ || process.env.NODE_ENV === 'development';
      
      if (isDev) {
        // In dev: Check if we have valid stored tokens
        const valid = await TokenService.isAccessTokenValid();
        setHasTokens(valid);
      } else {
        // In prod: Assume cookies are valid (they're httpOnly, can't check directly)
        // The backend will validate via cookies
        setHasTokens(true);
      }
    };
    checkTokens();
  }, []);

  return {
    isAuthenticated: hasTokens,
    checkTokens: async () => {
      const isDev = __DEV__ || process.env.NODE_ENV === 'development';
      
      if (isDev) {
        const valid = await TokenService.isAccessTokenValid();
        setHasTokens(valid);
        return valid;
      } else {
        // In production, we can't check tokens directly (they're in httpOnly cookies)
        // Return true and let the backend validate
        setHasTokens(true);
        return true;
      }
    },
    clearTokens: async () => {
      const isDev = __DEV__ || process.env.NODE_ENV === 'development';
      
      if (isDev) {
        await TokenService.clearTokens();
      }
      // Note: In production, cookies are cleared by backend on logout
      setHasTokens(false);
      queryClient.setQueryData(QUERY_KEYS.auth.currentUser(), null);
      queryClient.clear();
    },
  };
}

/**
 * Comprehensive authentication state hook using React Query
 */
export function useAuth() {
  // Get current user data
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useCurrentUser();

  // Check token validity
  const tokenAuth = useTokenAuth();

  // Computed authentication state
  const authState = useMemo(() => {
    // If we have a user object, we are authenticated
    const isAuthenticated = !!user;
    // If we are loading user or checking tokens, we are loading
    const isLoading = userLoading || tokenAuth.isAuthenticated === null;
    const error = userError;

    return {
      user,
      isAuthenticated,
      isLoading,
      error,
    };
  }, [user, userLoading, userError, tokenAuth.isAuthenticated]);

  // Login function
  const loginMutation = useLogin();

  // Register function
  const registerMutation = useRegister();

  // Logout function
  const logoutMutation = useLogout();

  return {
    // State
    ...authState,

    // Actions
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    clearTokens: tokenAuth.clearTokens,

    // Loading states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,

    // Mutation states
    loginMutation,
    registerMutation,
    logoutMutation,
  };
}


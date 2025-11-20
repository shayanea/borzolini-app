import { appConfig } from '@/constants/app';
import { TokenService } from './token-service';
import Constants from 'expo-constants';

// Types for API responses
export interface ApiError {
  message: string;
  code?: string;
}

// Check if we're in development mode
const isDevelopment = (): boolean => {
  return (
    __DEV__ ||
    Constants.expoConfig?.extra?.env === 'development' ||
    process.env.NODE_ENV === 'development'
  );
};

// Helper function to get headers with authentication
const getHeaders = async (
  additionalHeaders: Record<string, string> = {}
): Promise<Record<string, string>> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...additionalHeaders,
  };

  // In development: Use token-based authentication via Authorization header
  // In production: Rely on cookies (tokens not available in response body)
  if (isDevelopment()) {
    const authHeader = await TokenService.getAuthorizationHeader();
    if (authHeader) {
      headers['Authorization'] = authHeader;
      console.log('🔑 [DEV] Using Authorization header for authentication');
    } else {
      console.log('⚠️ [DEV] No Authorization header available - using cookies');
    }
  } else {
    console.log('🍪 [PROD] Using cookie-based authentication');
  }

  return headers;
};

// Helper function to handle token refresh and retry logic
// TODO: Implement proper refresh token logic using an AuthUtils service
const handleTokenRefresh = async <T>(
  originalRequest: () => Promise<T>
): Promise<T> => {
  try {
    // First attempt
    return await originalRequest();
  } catch (error: unknown) {
    // Check if it's a 401 error
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
      console.log('🔄 Received 401, clearing tokens...');
      // For now, just clear tokens and fail. 
      // In a real implementation, we would attempt refresh here.
      await TokenService.clearTokens();
      throw new Error('Authentication failed. Please login again.');
    }

    // Re-throw the original error if it's not a 401
    throw error;
  }
};

// Generic HTTP client for reusability across the application
export const httpClient = {
  post: async <T>(
    endpoint: string,
    data?: unknown,
    errorMessage?: string
  ): Promise<T> => {
    const makeRequest = async (): Promise<T> => {
      const headers = await getHeaders();
      const response = await fetch(`${appConfig.apiUrl}${endpoint}`, {
        method: 'POST',
        headers,
        body: data ? JSON.stringify(data) : undefined,
        credentials: 'include',
      });

      if (!response.ok) {
        let errorMsg = errorMessage;
        try {
          const error: ApiError = await response.json();
          errorMsg = error.message || errorMessage;
        } catch {
          // If JSON parse fails, use default error message
        }
        throw new Error(
          errorMsg || `Request failed with status ${response.status}`
        );
      }

      return response.json();
    };

    return handleTokenRefresh(makeRequest);
  },

  get: async <T>(endpoint: string, errorMessage?: string): Promise<T> => {
    const makeRequest = async (): Promise<T> => {
      const headers = await getHeaders();
      const response = await fetch(`${appConfig.apiUrl}${endpoint}`, {
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
         let errorMsg = errorMessage;
        try {
          const error: ApiError = await response.json();
          errorMsg = error.message || errorMessage;
        } catch {
          // If JSON parse fails, use default error message
        }
        throw new Error(
          errorMsg || `Request failed with status ${response.status}`
        );
      }

      return response.json();
    };

    return handleTokenRefresh(makeRequest);
  },

  put: async <T>(
    endpoint: string,
    data?: unknown,
    errorMessage?: string
  ): Promise<T> => {
    const makeRequest = async (): Promise<T> => {
      const headers = await getHeaders();
      const response = await fetch(`${appConfig.apiUrl}${endpoint}`, {
        method: 'PUT',
        headers,
        body: data ? JSON.stringify(data) : undefined,
        credentials: 'include',
      });

      if (!response.ok) {
        let errorMsg = errorMessage;
        try {
          const error: ApiError = await response.json();
          errorMsg = error.message || errorMessage;
        } catch {
          // If JSON parse fails, use default error message
        }
        throw new Error(
          errorMsg || `Request failed with status ${response.status}`
        );
      }

      return response.json();
    };

    return handleTokenRefresh(makeRequest);
  },

  patch: async <T>(
    endpoint: string,
    data?: unknown,
    errorMessage?: string
  ): Promise<T> => {
    const makeRequest = async (): Promise<T> => {
      const headers = await getHeaders();
      const response = await fetch(`${appConfig.apiUrl}${endpoint}`, {
        method: 'PATCH',
        headers,
        body: data ? JSON.stringify(data) : undefined,
        credentials: 'include',
      });

      if (!response.ok) {
        let errorMsg = errorMessage;
        try {
          const error: ApiError = await response.json();
          errorMsg = error.message || errorMessage;
        } catch {
          // If JSON parse fails, use default error message
        }
        throw new Error(
          errorMsg || `Request failed with status ${response.status}`
        );
      }

      return response.json();
    };

    return handleTokenRefresh(makeRequest);
  },

  delete: async <T>(endpoint: string, errorMessage?: string): Promise<T> => {
    const makeRequest = async (): Promise<T> => {
      const headers = await getHeaders();
      const response = await fetch(`${appConfig.apiUrl}${endpoint}`, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(
          errorMessage || `Request failed with status ${response.status}`
        );
      }

      return response.json();
    };

    return handleTokenRefresh(makeRequest);
  },

  postFormData: async <T>(
    endpoint: string,
    formData: FormData,
    errorMessage?: string
  ): Promise<T> => {
    const makeRequest = async (): Promise<T> => {
      const headers = await getHeaders();
      // Remove Content-Type header for FormData - browser/native will set it with boundary
      delete headers['Content-Type'];

      const response = await fetch(`${appConfig.apiUrl}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        let errorMsg = errorMessage;
        try {
          const error: ApiError = await response.json();
          errorMsg = error.message || errorMessage;
        } catch {
          // If JSON parse fails, use default error message
        }
        throw new Error(
          errorMsg || `Request failed with status ${response.status}`
        );
      }

      return response.json();
    };

    return handleTokenRefresh(makeRequest);
  },
};


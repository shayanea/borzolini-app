import Constants from 'expo-constants';
import { appConfig } from '@/constants/app';
import { TokenService } from './token-service';

export interface ApiError {
  message: string;
  code?: string;
}

interface HttpErrorPayload {
  status: number;
  statusText: string;
  body?: ApiError | string | null;
}

export class HttpRequestError extends Error {
  public readonly status: number;

  public readonly statusText: string;

  public readonly body?: ApiError | string | null;

  constructor(message: string, { status, statusText, body }: HttpErrorPayload) {
    super(message);
    this.name = 'HttpRequestError';
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }

  public isUnauthorized(): boolean {
    return this.status === 401;
  }
}

const isDevelopment = (): boolean => {
  return (
    __DEV__ ||
    Constants.expoConfig?.extra?.env === 'development' ||
    process.env.NODE_ENV === 'development'
  );
};

const getHeaders = async (
  additionalHeaders: Record<string, string> = {}
): Promise<Record<string, string>> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...additionalHeaders,
  };

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

const buildHttpError = async (
  response: Response,
  fallback?: string
): Promise<HttpRequestError> => {
  const basePayload: HttpErrorPayload = {
    status: response.status,
    statusText: response.statusText,
    body: null,
  };

  try {
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      const errorBody: ApiError = await response.json();
      basePayload.body = errorBody;
      const message =
        errorBody.message ||
        fallback ||
        `Request failed with status ${response.status}`;
      return new HttpRequestError(message, basePayload);
    }

    const text = await response.text();
    const snippet = text.slice(0, 200);
    basePayload.body = snippet;

    const message =
      fallback ||
      `Unexpected ${response.status} ${response.statusText} response: ${snippet}`;
    return new HttpRequestError(message, basePayload);
  } catch {
    const message =
      fallback || `Request failed with status ${response.status}`;
    return new HttpRequestError(message, basePayload);
  }
};

const parseJsonResponse = async <T>(response: Response): Promise<T> => {
  if (response.status === 204 || response.status === 205) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return (await response.json()) as T;
  }

  const text = await response.text();
  const snippet = text.slice(0, 200);
  console.error(
    `❌ Unexpected content-type (${contentType ?? 'unknown'}) for ${
      response.url
    }. Body preview: ${snippet}`
  );
  throw new Error('Unexpected response format from server');
};

const handleTokenRefresh = async <T>(
  originalRequest: () => Promise<T>
): Promise<T> => {
  try {
    return await originalRequest();
  } catch (error: unknown) {
    if (error instanceof HttpRequestError && error.isUnauthorized()) {
      console.log('🔄 Received 401, clearing tokens...');
      await TokenService.clearTokens();
      throw new HttpRequestError('Authentication failed. Please login again.', {
        status: error.status,
        statusText: error.statusText,
        body: error.body,
      });
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(String(error));
  }
};

export const httpClient = {
  post: async <T>(
    endpoint: string,
    data?: unknown,
    errorMessage?: string
  ): Promise<T> => {
    const makeRequest = async (): Promise<T> => {
      const url = `${appConfig.apiUrl}${endpoint}`;
      
      try {
        const headers = await getHeaders();
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: data ? JSON.stringify(data) : undefined,
          credentials: 'include',
        });

        if (!response.ok) {
          throw await buildHttpError(response, errorMessage);
        }

        return parseJsonResponse<T>(response);
      } catch (error) {
        if (error instanceof TypeError && error.message.includes('Network request failed')) {
          console.error(`❌ [Network Error] Failed to connect to: ${url}`);
          console.error(`   Make sure the server is running and accessible from this device`);
          console.error(`   Check if you're on the same network and firewall settings`);
          throw new Error(`Network request failed. Unable to reach ${url}. Please check your connection.`);
        }
        throw error;
      }
    };

    return handleTokenRefresh(makeRequest);
  },

  get: async <T>(endpoint: string, errorMessage?: string): Promise<T> => {
    const makeRequest = async (): Promise<T> => {
      const url = `${appConfig.apiUrl}${endpoint}`;
      
      try {
        const headers = await getHeaders();
        const response = await fetch(url, {
          headers,
          credentials: 'include',
        });

        if (!response.ok) {
          throw await buildHttpError(response, errorMessage);
        }

        return parseJsonResponse<T>(response);
      } catch (error) {
        if (error instanceof TypeError && error.message.includes('Network request failed')) {
          console.error(`❌ [Network Error] Failed to connect to: ${url}`);
          console.error(`   Make sure the server is running and accessible from this device`);
          console.error(`   Check if you're on the same network and firewall settings`);
          throw new Error(`Network request failed. Unable to reach ${url}. Please check your connection.`);
        }
        throw error;
      }
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
        throw await buildHttpError(response, errorMessage);
      }

      return parseJsonResponse<T>(response);
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
        throw await buildHttpError(response, errorMessage);
      }

      return parseJsonResponse<T>(response);
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
        throw await buildHttpError(response, errorMessage);
      }

      return parseJsonResponse<T>(response);
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
        throw await buildHttpError(response, errorMessage);
      }

      return parseJsonResponse<T>(response);
    };

    return handleTokenRefresh(makeRequest);
  },
};


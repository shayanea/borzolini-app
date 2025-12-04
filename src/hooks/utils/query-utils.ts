import {
    QueryKey,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

// Query Key Factory
export const QUERY_KEYS = {
  auth: {
    all: ['auth'] as const,
    currentUser: () => [...QUERY_KEYS.auth.all, 'current-user'] as const,
    login: () => [...QUERY_KEYS.auth.all, 'login'] as const,
    register: () => [...QUERY_KEYS.auth.all, 'register'] as const,
  },
  pets: {
    all: ['pets'] as const,
    list: () => [...QUERY_KEYS.pets.all, 'list'] as const,
    detail: (id: string) => [...QUERY_KEYS.pets.all, 'detail', id] as const,
  },
  breeds: {
    all: ['breeds'] as const,
    list: () => [...QUERY_KEYS.breeds.all, 'list'] as const,
		detail: (id: string) => [...QUERY_KEYS.breeds.all, 'detail', id] as const,
    popular: (species: string, limit?: number) =>
      [...QUERY_KEYS.breeds.all, 'popular', species, limit ?? 8] as const,
  },
  adoptionLocations: {
    all: ['adoption-locations'] as const,
    list: () => [...QUERY_KEYS.adoptionLocations.all, 'list'] as const,
    detail: (id: string) => [...QUERY_KEYS.adoptionLocations.all, 'detail', id] as const,
  },
  user: {
    all: ['user'] as const,
    profile: () => [...QUERY_KEYS.user.all, 'profile'] as const,
  },
  resources: {
    all: ['resources'] as const,
    active: (search?: string) =>
      [...QUERY_KEYS.resources.all, 'active', search ?? ''] as const,
    byType: (type: string) =>
      [...QUERY_KEYS.resources.all, 'by-type', type] as const,
  },
  aiVision: {
    all: ['ai-vision'] as const,
    analysis: (petId: string) => [...QUERY_KEYS.aiVision.all, 'analysis', petId] as const,
  },
};

// Configuration for React Query
export const QUERY_CONFIG = {
  STALE_TIME: {
    NONE: 0,
    SHORT: 1000 * 30, // 30 seconds
    MEDIUM: 1000 * 60 * 5, // 5 minutes
    LONG: 1000 * 60 * 30, // 30 minutes
  },
  RETRY: {
    NONE: 0,
    DEFAULT: 1,
    MAX: 3,
  },
};

// Types
export interface StandardMutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  data: TData | undefined;
  error: Error | null;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  reset: () => void;
}

export interface StandardQueryResult<TData> {
  data: TData | undefined;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => Promise<unknown>;
}

/**
 * Creates a standardized mutation hook with error handling and query invalidation
 */
export function createStandardMutationHook<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: {
    context?: string;
    errorMessage?: string;
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: QueryKey[];
  } = {}
) {
  return (): StandardMutationResult<TData, TVariables> => {
    const queryClient = useQueryClient();
    const {
      context = 'Operation',
      onSuccess,
      onError,
      invalidateQueries,
    } = options;

    const mutation = useMutation<TData, Error, TVariables>({
      mutationFn,
      onSuccess: async (data, variables) => {
        if (invalidateQueries) {
          await Promise.all(
            invalidateQueries.map(queryKey =>
              queryClient.invalidateQueries({ queryKey })
            )
          );
        }
        onSuccess?.(data, variables);
      },
      onError: error => {
        console.error(`${context} error:`, error);
        onError?.(error);
      },
    });

    return {
      mutate: mutation.mutate,
      mutateAsync: mutation.mutateAsync,
      data: mutation.data,
      error: mutation.error,
      isPending: mutation.isPending,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      reset: mutation.reset,
    };
  };
}

/**
 * Creates a standardized query hook with error handling
 */
export function createStandardQueryHook<TData>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options: {
    context?: string;
    errorMessage?: string;
    enabled?: boolean;
    staleTime?: number;
    retry?: number;
  } = {}
) {
  return (): StandardQueryResult<TData> => {
    const {
      context = 'Query',
      enabled = true,
      staleTime = QUERY_CONFIG.STALE_TIME.MEDIUM,
      retry = QUERY_CONFIG.RETRY.DEFAULT,
    } = options;

    const query = useQuery<TData, Error>({
      queryKey,
      queryFn: async () => {
        try {
          return await queryFn();
        } catch (error) {
          console.error(`${context} error:`, error);
          throw error;
        }
      },
      enabled,
      staleTime,
      retry,
    });

    return {
      data: query.data,
      error: query.error,
      isLoading: query.isLoading,
      isFetching: query.isFetching,
      isError: query.isError,
      isSuccess: query.isSuccess,
      refetch: query.refetch,
    };
  };
}

import { httpClient } from './http-client';
import { BreedsResponse } from '@/types/pet';
import { createStandardQueryHook, QUERY_KEYS } from '@/hooks/utils';

// API functions
const breedsApi = {
  getBreeds: (): Promise<BreedsResponse> =>
    httpClient.get<BreedsResponse>('/api/v1/breeds', 'Failed to get breeds'),
};

// Hooks
export function useBreeds() {
  return createStandardQueryHook(
    QUERY_KEYS.breeds.all(),
    () => breedsApi.getBreeds(),
    {
      context: 'Breeds',
      errorMessage: 'Failed to load breeds',
      staleTime: 1000 * 60 * 30, // 30 minutes - breeds don't change often
    }
  )();
}


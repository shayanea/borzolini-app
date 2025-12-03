import { createStandardQueryHook, QUERY_KEYS } from '@/hooks/utils';
import { Breed, BreedsResponse } from '@/types/pet';
import { PetSpecies } from '@/types/pet/pet-enums';
import { httpClient } from './http-client';

// API functions
const breedsApi = {
  getBreeds: (): Promise<BreedsResponse> =>
    httpClient.get<BreedsResponse>('/v1/breeds', 'Failed to get breeds'),
  getBreedById: (id: string): Promise<Breed> =>
    httpClient.get<Breed>(`/v1/breeds/${id}`, 'Failed to get breed details'),
};

// Helper function to get popular breeds by species
async function getPopularBreedsBySpecies(
  species: PetSpecies,
  limit: number = 8
): Promise<Breed[]> {
  const response = await breedsApi.getBreeds();
  const speciesData = response.breeds_by_species.find(
    item => item.species === species
  );

  if (!speciesData) {
    return [];
  }

  // Get active breeds only and take the last N items
  const activeBreeds = speciesData.breeds.filter(breed => breed.is_active);
  return activeBreeds.slice(-limit);
}

// Hooks
export function useBreeds() {
  return createStandardQueryHook(
    QUERY_KEYS.breeds.all,
    () => breedsApi.getBreeds(),
    {
      context: 'Breeds',
      errorMessage: 'Failed to load breeds',
      staleTime: 1000 * 60 * 30, // 30 minutes - breeds don't change often
    }
  )();
}

export function usePopularCatBreeds(limit: number = 8) {
  return createStandardQueryHook(
    QUERY_KEYS.breeds.popular(PetSpecies.CAT, limit),
    () => getPopularBreedsBySpecies(PetSpecies.CAT, limit),
    {
      context: 'Popular cat breeds',
      errorMessage: 'Failed to load popular cat breeds',
      staleTime: 1000 * 60 * 15, // 15 minutes cache as requested
    }
  )();
}

export function useBreedById(id: string) {
  return createStandardQueryHook(
    QUERY_KEYS.breeds.detail(id),
    () => breedsApi.getBreedById(id),
    {
      context: 'Breed detail',
      errorMessage: 'Failed to load breed details',
      staleTime: 1000 * 60 * 30, // 30 minutes
    }
  )();
}


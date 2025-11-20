import { httpClient } from './http-client';
import { Pet, CreatePetDto, UpdatePetDto } from '@/types/pet';
import { createStandardMutationHook, createStandardQueryHook, QUERY_KEYS } from '@/hooks/utils';
import { useQueryClient } from '@tanstack/react-query';

// API functions
const petsApi = {
  getUserPets: (): Promise<Pet[]> =>
    httpClient.get<Pet[]>('/pets/my-pets', 'Failed to get user pets'),

  getPet: (id: string): Promise<Pet> =>
    httpClient.get<Pet>(`/pets/${id}`, 'Failed to get pet'),

  createPet: (data: CreatePetDto): Promise<Pet> =>
    httpClient.post<Pet>('/pets', data, 'Failed to create pet'),

  updatePet: ({ id, data }: { id: string; data: UpdatePetDto }): Promise<Pet> =>
    httpClient.patch<Pet>(`/pets/${id}`, data, 'Failed to update pet'),

  deletePet: (id: string): Promise<void> =>
    httpClient.delete(`/pets/${id}`, 'Failed to delete pet'),
};

// Hooks

export function useUserPets() {
  return createStandardQueryHook(
    QUERY_KEYS.pets.list(),
    () => petsApi.getUserPets(),
    {
      context: 'User Pets',
      errorMessage: 'Failed to load pets',
    }
  )();
}

export function usePet(id: string) {
  return createStandardQueryHook(
    QUERY_KEYS.pets.detail(id),
    () => petsApi.getPet(id),
    {
      context: 'Pet Details',
      errorMessage: 'Failed to load pet details',
      enabled: !!id,
    }
  )();
}

export function useCreatePet() {
  return createStandardMutationHook(
    petsApi.createPet,
    {
      context: 'Create Pet',
      errorMessage: 'Failed to create pet',
      invalidateQueries: [QUERY_KEYS.pets.list()],
    }
  )();
}

export function useUpdatePet() {
  const queryClient = useQueryClient();
  return createStandardMutationHook(
    petsApi.updatePet,
    {
      context: 'Update Pet',
      errorMessage: 'Failed to update pet',
      onSuccess: (data) => {
        queryClient.setQueryData(QUERY_KEYS.pets.detail(data.id), data);
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pets.list() });
      },
    }
  )();
}

export function useDeletePet() {
  return createStandardMutationHook(
    petsApi.deletePet,
    {
      context: 'Delete Pet',
      errorMessage: 'Failed to delete pet',
      invalidateQueries: [QUERY_KEYS.pets.list()],
    }
  )();
}


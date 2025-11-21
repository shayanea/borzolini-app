import { PetSpecies } from '@/types/pet';

export type UserType = 'pet-owner' | 'pet-adopter' | 'companion-seeker';

export interface IntroductionData {
  userType: UserType | null;
  selectedSpecies?: PetSpecies;
  selectedBreeds: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  dateOfBirth: string;
  gender: string;
  profilePicture?: string | { uri: string; width?: number; height?: number };
}


import type { PetGender, PetSize, PetSpecies } from './pet-enums';

export interface PetFilters {
  species?: string;
  gender?: string;
  size?: string;
  is_spayed_neutered?: boolean;
  is_vaccinated?: boolean;
  search?: string;
  owner_id?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed?: string;
  gender: PetGender;
  date_of_birth?: Date;
  weight?: number;
  size?: PetSize;
  color?: string;
  microchip_number?: string;
  is_spayed_neutered: boolean;
  is_vaccinated: boolean;
  medical_history?: string;
  behavioral_notes?: string;
  dietary_requirements?: string;
  allergies: string[];
  medications: string[];
  emergency_contact?: string;
  emergency_phone?: string;
  photo_url?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  owner_id: string;
  // Computed properties (not stored in database)
  age?: number;
  ageInMonths?: number;
}


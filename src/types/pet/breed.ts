import { PetSpecies } from './pet-enums';

export type SizeCategory = 'tiny' | 'small' | 'medium' | 'large' | 'giant';
export type GroomingNeeds = 'low' | 'moderate' | 'high';
export type ExerciseNeeds = 'low' | 'moderate' | 'high';

export interface Breed {
  id: string;
  name: string;
  species: PetSpecies;
  temperament: string;
  health_risks: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  size_category: SizeCategory;
  life_expectancy_min: number;
  life_expectancy_max: number;
  weight_min: string;
  weight_max: string;
  origin_country: string;
  origin_history: string | null;
  description: string;
  image_url: string;
  resources: string[] | null;
  grooming_needs: GroomingNeeds;
  exercise_needs: ExerciseNeeds;
}

export interface BreedsBySpecies {
  species: PetSpecies;
  breeds: Breed[];
}

export interface BreedsResponse {
  breeds_by_species: BreedsBySpecies[];
  total_breeds: number;
  total_species: number;
}


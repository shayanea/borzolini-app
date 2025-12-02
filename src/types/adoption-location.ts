export interface AdoptionLocation {
  id: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
  email?: string;
  website?: string;
  latitude: number;
  longitude: number;
  distanceKm?: number;
  is_verified?: boolean;
  rating?: number;
  total_reviews?: number;
  services?: string[];
  specializations?: string[];
  available_breeds?: string[];
  species?: string[];
  total_pets_available?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AdoptionLocationFilters {
  species?: string;
  breed?: string;
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  radius?: number; // in km
  serviceType?: string; // e.g., 'adoption', 'shelter', 'rescue'
}

export interface AdoptionLocationsResponse {
  clinics: AdoptionLocation[];
  total: number;
  radiusKm?: number;
  serviceType?: string;
}

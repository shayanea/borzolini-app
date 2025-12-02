import {
  AdoptionLocation,
  AdoptionLocationFilters,
  AdoptionLocationsResponse,
} from '@/types/adoption-location';
import { QUERY_KEYS, createStandardQueryHook } from '@/hooks/utils';

import { httpClient } from './http-client';

// Helper function to validate coordinates
function isValidCoordinate(value: number | undefined): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value !== 'number' || isNaN(value)) return false;
  return true;
}

function isValidLatitude(lat: number | undefined): boolean {
  if (!isValidCoordinate(lat)) return false;
  return lat! >= -90 && lat! <= 90;
}

function isValidLongitude(lng: number | undefined): boolean {
  if (!isValidCoordinate(lng)) return false;
  return lng! >= -180 && lng! <= 180;
}

// API functions - Using the real clinic-finder endpoints
const adoptionLocationApi = {
  getLocations: (
    filters?: AdoptionLocationFilters
  ): Promise<AdoptionLocationsResponse> => {
    // Validate that we have required parameters
    const isValid =
      !filters ||
      !isValidLatitude(filters.latitude) ||
      !isValidLongitude(filters.longitude);
    if (isValid) {
      throw new Error(
        'Valid latitude and longitude are required to fetch adoption locations'
      );
    }

    const params = new URLSearchParams();

    // Add required parameters for the clinic-finder API
    params.append('latitude', filters.latitude!.toString());
    params.append('longitude', filters.longitude!.toString());

    if (filters.radius) {
      params.append('radiusKm', filters.radius.toString());
    }

    params.append('serviceType', 'shelter');

    const queryString = params.toString();
    // Using the clinic-finder endpoint from the backend API
    const endpoint = `/v1/clinic-finder/nearby?${queryString}`;

    return httpClient.get<AdoptionLocationsResponse>(
      endpoint,
      'Failed to get nearby locations'
    );
  },

  getLocationById: (id: string): Promise<AdoptionLocation> =>
    httpClient.get<AdoptionLocation>(
      `/v1/clinic-finder/${id}`,
      'Failed to get location details'
    ),
};

// Hooks
export function useAdoptionLocations(filters?: AdoptionLocationFilters) {
  // Only enable the query if we have valid coordinates
  const isValid = filters
    ? isValidLatitude(filters.latitude) && isValidLongitude(filters.longitude)
    : false;

  return createStandardQueryHook(
    filters
      ? [...QUERY_KEYS.adoptionLocations.all, 'list', filters]
      : QUERY_KEYS.adoptionLocations.list(),
    () => adoptionLocationApi.getLocations(filters),
    {
      context: 'Adoption Locations',
      errorMessage: 'Failed to load adoption locations',
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled: isValid, // Only run query when we have valid coordinates
    }
  )();
}

export function useAdoptionLocation(id: string) {
  return createStandardQueryHook(
    QUERY_KEYS.adoptionLocations.detail(id),
    () => adoptionLocationApi.getLocationById(id),
    {
      context: 'Adoption Location',
      errorMessage: 'Failed to load adoption location',
      staleTime: 1000 * 60 * 5,
      enabled: id !== '',
    }
  )();
}

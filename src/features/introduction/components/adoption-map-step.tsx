import * as Location from 'expo-location';

import {
  ActivityIndicator,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { LeafletMap } from '@/components/ui/leaflet-map';
import { PetSpecies } from '@/types/pet/pet-enums';
import { useAdoptionLocations } from '@/services/adoption-locations';

interface AdoptionMapStepProps {
  selectedSpecies?: PetSpecies;
  selectedBreeds?: string[];
}

export function AdoptionMapStep({
  selectedSpecies,
  selectedBreeds,
}: AdoptionMapStepProps) {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>({ latitude: 33.6812568, longitude: -117.8145963 });
  const [locationPermission, setLocationPermission] = useState<boolean>(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState<boolean>(false);

  // Fetch adoption locations based on selected species, breeds, and user location
  const {
    data: locationsData,
    isLoading,
    isError,
  } = useAdoptionLocations(
    userLocation &&
      typeof userLocation.latitude === 'number' &&
      !isNaN(userLocation.latitude) &&
      typeof userLocation.longitude === 'number' &&
      !isNaN(userLocation.longitude)
      ? {
          species: selectedSpecies,
          breed:
            selectedBreeds && selectedBreeds.length > 0
              ? selectedBreeds[0]
              : undefined, // API accepts single breed, use first selected
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          radius: 50, // 50km radius
          serviceType: 'adoption', // Required by API
        }
      : undefined
  );

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setIsGettingLocation(true);
  //       setLocationError(null);

  //       const { status } = await Location.requestForegroundPermissionsAsync();

  //       if (status === 'granted') {
  //         setLocationPermission(true);
  //         try {
  //           const location = await Location.getCurrentPositionAsync({
  //             accuracy: Location.Accuracy.Balanced,
  //           });
  //           const coords = {
  //             latitude: location.coords.latitude,
  //             longitude: location.coords.longitude,
  //           };
  //           setUserLocation(coords);
  //           setRegion({
  //             ...coords,
  //             latitudeDelta: 0.5,
  //             longitudeDelta: 0.5,
  //           });
  //           setLocationError(null);
  //         } catch (error: unknown) {
  //           // Handle location unavailable error
  //           const errorMessage =
  //             error instanceof Error
  //               ? error.message
  //               : 'Unable to get your current location';
  //           setLocationError(errorMessage);
  //           setLocationPermission(false);
  //           console.error('Location error:', error);
  //         }
  //       } else {
  //         setLocationPermission(false);
  //         setLocationError(
  //           'Location permission was denied. Please enable location services in your device settings.'
  //         );
  //       }
  //     } catch (error: unknown) {
  //       const errorMessage =
  //         error instanceof Error
  //           ? error.message
  //           : 'Failed to request location permission';
  //       setLocationError(errorMessage);
  //       setLocationPermission(false);
  //       console.error('Permission error:', error);
  //     } finally {
  //       setIsGettingLocation(false);
  //     }
  //   })();
  // }, []);

  const handleOpenSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.error('Failed to open settings:', error);
      // Fallback: show alert with instructions
      alert(
        'Please go to your device Settings > Privacy & Security > Location Services and enable location for this app.'
      );
    }
  };

  const handleMarkerPress = (location: {
    name: string;
    phone?: string;
    website?: string;
  }) => {
    // You could show a callout or modal with more details
    console.log('Location selected:', location.name);
  };

  // Show loading while getting location
  if (isGettingLocation) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#f97316" />
        <Text className="text-gray-600 mt-4">Getting your location...</Text>
      </View>
    );
  }

  // Show error message if location is unavailable or permission denied
  const isValid = locationError || (!userLocation && !locationPermission);
  if (isValid) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Ionicons name="location-outline" size={64} color="#ef4444" />
        <Text className="text-red-600 text-center text-lg font-semibold mt-4 mb-2">
          Location Unavailable
        </Text>
        <Text className="text-gray-600 text-center mb-6 leading-6">
          {locationError ||
            'We need your location to show nearby adoption centers. Please enable location services in your device settings.'}
        </Text>
        <TouchableOpacity
          onPress={handleOpenSettings}
          className="bg-orange-500 px-6 py-3 rounded-full shadow-lg active:bg-orange-600"
        >
          <Text className="text-white font-semibold text-base">
            Open Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            setLocationError(null);
            setIsGettingLocation(true);
            try {
              const { status } =
                await Location.requestForegroundPermissionsAsync();
              if (status === 'granted') {
                setLocationPermission(true);
                const location = await Location.getCurrentPositionAsync({
                  accuracy: Location.Accuracy.Balanced,
                });
                const coords = {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                };
                setUserLocation(coords);

                setLocationError(null);
              }
            } catch (error: unknown) {
              setLocationError(
                error instanceof Error
                  ? error.message
                  : 'Unable to get your current location'
              );
            } finally {
              setIsGettingLocation(false);
            }
          }}
          className="mt-4"
        >
          <Text className="text-orange-500 font-medium text-base">
            Try Again
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#f97316" />
        <Text className="text-gray-600 mt-4">Loading adoption centers...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
        <Text className="text-red-600 text-center text-lg font-semibold mt-4 mb-2">
          Failed to load adoption centers
        </Text>
        <Text className="text-gray-600 text-center">
          Please check your connection and try again.
        </Text>
      </View>
    );
  }

  const locations = locationsData?.clinics || [];

  return (
    <View className="flex-1">
      <View className="mb-4">
        <Text className="text-3xl font-bold text-white mb-2">
          Find Your New Friend
        </Text>
        <Text className="text-base text-gray-600 leading-6">
          {selectedSpecies
            ? `We found ${locations.length} adoption center${locations.length !== 1 ? 's' : ''} with ${selectedSpecies.toLowerCase()}s nearby`
            : `Explore ${locations.length} adoption center${locations.length !== 1 ? 's' : ''} near you`}
        </Text>
      </View>

      {locations.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6 bg-gray-50 rounded-2xl">
          <Ionicons name="paw-outline" size={64} color="#9ca3af" />
          <Text className="text-gray-700 text-center text-lg font-semibold mt-4 mb-2">
            No centers found
          </Text>
          <Text className="text-gray-500 text-center">
            {selectedSpecies
              ? `We couldn't find any adoption centers with ${selectedSpecies.toLowerCase()}s in your area. Try adjusting your filters.`
              : "We couldn't find any adoption centers in your area. Try again later."}
          </Text>
        </View>
      ) : (
        <View className="flex-1 rounded-2xl overflow-hidden border-2 border-gray-200">
          <LeafletMap
            locations={locations.map(loc => ({
              id: loc.id,
              latitude: loc.latitude,
              longitude: loc.longitude,
              title: loc.name,
              description: loc.description || loc.address,
            }))}
            userLocation={userLocation}
            onMarkerPress={id => {
              const loc = locations.find(l => l.id === id);
              if (loc) handleMarkerPress(loc);
            }}
          />

          {/* Location count badge */}
          <View className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
            <Text className="text-sm font-semibold text-white">
              {locations.length} {locations.length === 1 ? 'Center' : 'Centers'}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const INITIAL_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MOCK_LOCATIONS = [
  {
    id: 1,
    title: 'Happy Paws Adoption Center',
    description: 'Find your new best friend here!',
    coordinate: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 2,
    title: 'City Pet Shelter',
    description: 'Adoption and care services.',
    coordinate: {
      latitude: 37.75825,
      longitude: -122.4624,
    },
  },
  {
    id: 3,
    title: 'Golden Gate Veterinary Clinic',
    description: 'Full service vet clinic.',
    coordinate: {
      latitude: 37.79825,
      longitude: -122.4124,
    },
  },
];

export default function MapScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center pt-[60px] pb-4 px-4 bg-white z-10 shadow-sm">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black">Find Near Clinics</Text>
      </View>
      
      <MapView
        className="flex-1"
        provider={PROVIDER_DEFAULT}
        initialRegion={INITIAL_REGION}
      >
        {MOCK_LOCATIONS.map((location) => (
          <Marker
            key={location.id}
            coordinate={location.coordinate}
            title={location.title}
            description={location.description}
          />
        ))}
      </MapView>
    </View>
  );
}

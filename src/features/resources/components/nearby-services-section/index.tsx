import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Ionicons } from '@expo/vector-icons';
import { useAdoptionLocations } from '@/services/adoption-locations';
import { useRouter } from 'expo-router';

function formatDistance(km?: number): string {
  if (!km) return 'N/A';
  const miles = km * 0.621371;
  return `${miles.toFixed(1)} mi`;
}

function getServiceType(clinic: {
  services?: string[];
  specializations?: string[];
}): string {
  if (clinic.services && clinic.services.length > 0) {
    const firstService = clinic.services[0].toLowerCase();
    if (firstService.includes('emergency') || firstService.includes('24/7')) {
      return 'Emergency 24/7';
    }
    if (firstService.includes('groom')) {
      return 'Groomer';
    }
    if (firstService.includes('park')) {
      return 'Park';
    }
    if (firstService.includes('vet') || firstService.includes('clinic')) {
      return 'Vet Clinic';
    }
    return clinic.services[0];
  }
  if (clinic.specializations && clinic.specializations.length > 0) {
    return clinic.specializations[0];
  }
  return 'Service';
}

interface ServiceItemProps {
  name: string;
  type: string;
  distance: string;
  isLast: boolean;
}

function ServiceItem({
  name,
  type,
  distance,
  isLast,
}: ServiceItemProps): JSX.Element {
  return (
    <>
      <View className="flex-row items-center justify-between py-3">
        <View className="flex-1 mr-3">
          <Text
            className="text-white font-semibold text-sm mb-0.5"
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text className="text-gray-400 text-xs" numberOfLines={1}>
            {type}
          </Text>
        </View>
        <View className="bg-white/10 px-2.5 py-1 rounded-[4px]">
          <Text className="text-[#1fadad] text-xs font-medium">{distance}</Text>
        </View>
      </View>
      {!isLast && <View className="h-px bg-white/10" />}
    </>
  );
}

export function NearbyServicesSection(): JSX.Element | null {
  const router = useRouter();
  const [userLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>({ latitude: 33.6812568, longitude: -117.8145963 });

  const { data, isLoading, isError } = useAdoptionLocations(
    userLocation
      ? {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          radius: 10,
          serviceType: 'clinic',
        }
      : undefined
  );

  const handleViewMap = (): void => {
    router.push('/map');
  };

  const isDataAvailable =
    isLoading || isError || !data || data.clinics.length === 0;
  if (isDataAvailable) {
    return null;
  }

  const services = data.clinics.slice(0, 3);

  return (
    <View className="mt-8">
      {/* Header */}
      <View className="flex-row items-center mb-3">
        <Ionicons name="location" size={18} color="#ffffff" />
        <Text className="text-white font-bold text-sm ml-2">
          Nearby Services
        </Text>
      </View>

      {/* Card */}
      <Card className="bg-[#202024] border-white/10 px-4 py-3">
        {services.map((clinic, index) => (
          <ServiceItem
            key={clinic.id}
            name={clinic.name}
            type={getServiceType(clinic)}
            distance={formatDistance(clinic.distanceKm)}
            isLast={index === services.length - 1}
          />
        ))}

        {/* View Full Map Button */}
        <TouchableOpacity
          onPress={handleViewMap}
          activeOpacity={0.7}
          className="my-4 items-center"
        >
          <Text className="text-[#a855f7] font-semibold text-sm">
            View Full Map
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
}



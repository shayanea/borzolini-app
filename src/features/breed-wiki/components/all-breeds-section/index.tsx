import { Breed, BreedsBySpecies } from '@/types/pet';
import {
    ActivityIndicator,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { useBreeds } from '@/services/breeds';
import { PetSpecies } from '@/types/pet/pet-enums';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const SPECIES_DISPLAY_NAMES: Record<PetSpecies, string> = {
  [PetSpecies.DOG]: 'Dogs',
  [PetSpecies.CAT]: 'Cats',
  [PetSpecies.BIRD]: 'Birds',
  [PetSpecies.RABBIT]: 'Rabbits',
  [PetSpecies.HAMSTER]: 'Hamsters',
  [PetSpecies.FISH]: 'Fish',
  [PetSpecies.REPTILE]: 'Reptiles',
  [PetSpecies.HORSE]: 'Horses',
  [PetSpecies.OTHER]: 'Other',
};

const SPECIES_ICONS: Record<PetSpecies, keyof typeof Ionicons.glyphMap> = {
  [PetSpecies.DOG]: 'paw',
  [PetSpecies.CAT]: 'paw',
  [PetSpecies.BIRD]: 'bird-outline' as keyof typeof Ionicons.glyphMap,
  [PetSpecies.RABBIT]: 'paw',
  [PetSpecies.HAMSTER]: 'paw',
  [PetSpecies.FISH]: 'fish',
  [PetSpecies.REPTILE]: 'paw',
  [PetSpecies.HORSE]: 'paw',
  [PetSpecies.OTHER]: 'paw',
};

const MIN_BREEDS_TO_SHOW = 10;

export function AllBreedsSection(): JSX.Element | null {
  const { data, isLoading, isError } = useBreeds();
  const [expandedSpecies, setExpandedSpecies] = useState<Set<PetSpecies>>(
    new Set()
  );

  if (isLoading) {
    return (
      <View className="px-6 mt-6">
        <View className="items-center py-12">
          <ActivityIndicator size="large" color="#a855f7" />
          <Text className="text-gray-400 mt-4">Loading breeds...</Text>
        </View>
      </View>
    );
  }

  const isDataAvailable =
    isLoading || isError || !data || !data.breeds_by_species;
  if (isDataAvailable) {
    return (
      <View className="px-6 mt-6">
        <View className="items-center py-12">
          <Ionicons name="alert-circle" size={48} color="#ef4444" />
          <Text className="text-red-400 mt-4 text-center">
            Failed to load breeds. Please try again.
          </Text>
        </View>
      </View>
    );
  }

  const speciesWithBreeds = data.breeds_by_species.filter(
    speciesData => speciesData.breeds.length > 0
  );

  if (speciesWithBreeds.length === 0) {
    return null;
  }

  const toggleSpecies = (species: PetSpecies) => {
    const newExpanded = new Set(expandedSpecies);
    if (newExpanded.has(species)) {
      newExpanded.delete(species);
    } else {
      newExpanded.add(species);
    }
    setExpandedSpecies(newExpanded);
  };

  return (
    <View className="px-6 mt-6">
      <View className="flex-row items-center mb-6">
        <Ionicons name="library" size={20} color="#a855f7" />
        <Text className="text-white font-bold text-lg ml-2">
          All Breeds by Species
        </Text>
      </View>

      {speciesWithBreeds.map(speciesData => (
        <SpeciesSection
          key={speciesData.species}
          speciesData={speciesData}
          isExpanded={expandedSpecies.has(speciesData.species)}
          onToggle={() => toggleSpecies(speciesData.species)}
        />
      ))}
    </View>
  );
}

interface SpeciesSectionProps {
  speciesData: BreedsBySpecies;
  isExpanded: boolean;
  onToggle: () => void;
}

function SpeciesSection({
  speciesData,
  isExpanded,
  onToggle,
}: SpeciesSectionProps): JSX.Element {
  const activeBreeds = speciesData.breeds.filter(breed => breed.is_active);
  const displayBreeds = isExpanded
    ? activeBreeds
    : activeBreeds.slice(0, MIN_BREEDS_TO_SHOW);
  const hasMoreBreeds = activeBreeds.length > MIN_BREEDS_TO_SHOW;
  const remainingCount = activeBreeds.length - MIN_BREEDS_TO_SHOW;

  return (
    <View className="mb-8">
      {/* Species Header */}
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.7}
        className="flex-row items-center justify-between mb-4 bg-[#232328] rounded-xl px-4 py-3"
      >
        <View className="flex-row items-center flex-1">
          <Ionicons
            name={SPECIES_ICONS[speciesData.species]}
            size={20}
            color="#a855f7"
          />
          <Text className="text-white font-semibold text-base ml-2">
            {SPECIES_DISPLAY_NAMES[speciesData.species]}
          </Text>
          <Text className="text-gray-400 text-sm ml-2">
            ({activeBreeds.length}{' '}
            {activeBreeds.length === 1 ? 'breed' : 'breeds'})
          </Text>
        </View>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#6b7280"
        />
      </TouchableOpacity>

      {/* Breeds Grid */}
      <View className="flex-row flex-wrap -mx-2">
        {displayBreeds.map(breed => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </View>

      {/* Show More Button */}
      {hasMoreBreeds && !isExpanded && (
        <TouchableOpacity
          onPress={onToggle}
          activeOpacity={0.7}
          className="mt-4 items-center py-3 bg-[#2a2a30] rounded-xl"
        >
          <Text className="text-[#a855f7] font-semibold">
            Show {remainingCount} More{' '}
            {remainingCount === 1 ? 'Breed' : 'Breeds'}
          </Text>
        </TouchableOpacity>
      )}

      {/* Show Less Button */}
      {hasMoreBreeds && isExpanded && (
        <TouchableOpacity
          onPress={onToggle}
          activeOpacity={0.7}
          className="mt-4 items-center py-3 bg-[#2a2a30] rounded-xl"
        >
          <Text className="text-[#a855f7] font-semibold">Show Less</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

interface BreedCardProps {
  breed: Breed;
}

function BreedCard({ breed }: BreedCardProps): JSX.Element {
  const router = useRouter();

  return (
    <TouchableOpacity 
      activeOpacity={0.85} 
      className="w-[48%] mx-1 mb-3"
      onPress={() => router.push(`/breed-detail/${breed.id}`)}
    >
      <View className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#232328] relative">
        {breed.image_url ? (
          <Image
            source={{ uri: breed.image_url }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="flex-1 items-center justify-center bg-[#232328]">
            <Ionicons name="paw" size={32} color="#6b7280" />
          </View>
        )}

        {/* Gradient overlay at bottom for text readability */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0, y: 1 }}
          className="absolute bottom-0 left-0 right-0 h-20"
        />

        {/* Breed name overlay */}
        <View className="absolute bottom-0 left-0 right-0 p-3">
          <Text className="text-white font-semibold text-sm" numberOfLines={1}>
            {breed.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}


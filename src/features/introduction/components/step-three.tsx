import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useBreeds } from '@/services/breeds';

// Emoji mapping for species
const speciesEmojis: Record<string, string> = {
  dog: '🐕',
  cat: '🐱',
  bird: '🐦',
  rabbit: '🐰',
  hamster: '🐹',
  fish: '🐠',
  reptile: '🦎',
  horse: '🐴',
  other: '❓',
};

interface StepThreeProps {
  selectedBreeds: string[];
  onBreedToggle: (breed: string) => void;
}

export function StepThree({ selectedBreeds, onBreedToggle }: StepThreeProps) {
  const { data: breedsData, isLoading, isError } = useBreeds();

  // Get unique species from API response
  const species = breedsData
    ? breedsData.breeds_by_species.map(item => item.species) || []
    : [];

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#f97316" />
        <Text className="text-gray-600 mt-4">Loading species...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-600 text-center">
          Failed to load species. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Text className="text-3xl font-bold text-gray-900 mb-4">
        Species Preferences
      </Text>
      <Text className="text-base text-gray-600 leading-6 mb-8">
        Select the species of animals you're interested in adopting.
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-4"
      >
        <View className="flex-row flex-wrap gap-3">
          {species.map(speciesName => {
            const isSelected = selectedBreeds.includes(speciesName);
            const emoji = speciesEmojis[speciesName] || '🐾';
            return (
              <TouchableOpacity
                key={speciesName}
                onPress={() => onBreedToggle(speciesName)}
                activeOpacity={0.7}
                className={`h-24 w-32 items-center justify-center rounded-2xl border ${
                  isSelected
                    ? 'bg-orange-500 border-orange-500'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Text
                  className={`text-xl font-medium ${
                    isSelected ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {emoji} {speciesName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

import { useBreeds } from '@/services/breeds';
import { PetSpecies } from '@/types/pet/pet-enums';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface StepThreeProps {
  selectedSpecies: PetSpecies | undefined;
  selectedBreeds: string[];
  onBreedToggle: (breed: string) => void;
}

export function StepThree({
  selectedSpecies,
  selectedBreeds,
  onBreedToggle,
}: StepThreeProps) {
  const { data: breedsData, isLoading, isError } = useBreeds();

  // Get breeds for selected species from API response
  const breeds =
    selectedSpecies && breedsData
      ? breedsData.breeds_by_species
          .find(item => item.species === selectedSpecies)
          ?.breeds.map(breed => breed.name) || []
      : [];

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#f97316" />
        <Text className="text-gray-600 mt-4">Loading breeds...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-600 text-center">
          Failed to load breeds. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Text className="text-3xl font-bold text-gray-900 mb-4">
        Breed Preferences
      </Text>
      <Text className="text-base text-gray-600 leading-6 mb-8">
        Specify your preferences for the breed of the animal you'd like to
        adopt, based on your previous choice. Select all that apply.
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-4"
      >
        {breeds.length === 0 ? (
          <View className="py-8">
            <Text className="text-gray-500 text-center">
              {selectedSpecies
                ? 'No breeds available for this species.'
                : 'Please select a species first.'}
            </Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap gap-3">
            {breeds.map(breed => {
              const isSelected = selectedBreeds.includes(breed);
              return (
                <TouchableOpacity
                  key={breed}
                  onPress={() => onBreedToggle(breed)}
                  activeOpacity={0.7}
                  className={`px-6 py-3 rounded-full border ${
                    isSelected
                      ? 'bg-orange-500 border-orange-500'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      isSelected ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {breed}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

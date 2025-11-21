import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { PetSpecies } from '@/types/pet/pet-enums';
import { getBreedsForSpecies } from '../constants/breeds';

interface StepThreeProps {
  selectedSpecies: PetSpecies | undefined;
  selectedBreeds: string[];
  onBreedToggle: (breed: string) => void;
}

export function StepThree({ selectedSpecies, selectedBreeds, onBreedToggle }: StepThreeProps) {
  const breeds = selectedSpecies ? getBreedsForSpecies(selectedSpecies) : [];

  return (
    <View className="flex-1">
      <Text className="text-3xl font-bold text-gray-900 mb-4">
        Breed Preferences
      </Text>
      <Text className="text-base text-gray-600 leading-6 mb-8">
        Specify your preferences for the breed of the animal you'd like to adopt, based on your previous choice. Select all that apply.
      </Text>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-4"
      >
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
      </ScrollView>
    </View>
  );
}


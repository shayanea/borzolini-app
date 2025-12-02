import { Text, TouchableOpacity, View } from 'react-native';

import { PetSpecies } from '@/types/pet/pet-enums';

interface StepTwoProps {
  selectedSpecies: PetSpecies | undefined;
  onSpeciesSelect: (species: PetSpecies) => void;
}

const SPECIES_OPTIONS = [
  { label: 'Dogs', value: PetSpecies.DOG, icon: '🐕' },
  { label: 'Cats', value: PetSpecies.CAT, icon: '🐱' },
  { label: 'Rabbits', value: PetSpecies.RABBIT, icon: '🐰' },
  { label: 'Birds', value: PetSpecies.BIRD, icon: '🐦' },
  { label: 'Reptiles', value: PetSpecies.REPTILE, icon: '🦎' },
  { label: 'Fish', value: PetSpecies.FISH, icon: '🐠' },

  { label: 'Primates', value: PetSpecies.OTHER, icon: '🐵' },
  { label: 'Horses', value: PetSpecies.HORSE, icon: '🐴' },
  { label: 'Other', value: PetSpecies.OTHER, icon: '🐾' },
];

export function StepTwo({ selectedSpecies, onSpeciesSelect }: StepTwoProps) {
  return (
    <View className="flex-1">
      <Text className="text-3xl font-bold text-white mb-4">
        Let's Find Your Match!
      </Text>
      <Text className="text-base text-gray-600 leading-6 mb-8">
        What type of animal are you looking to adopt? Don't worry, you can
        always change this later.
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {SPECIES_OPTIONS.map((option, index) => {
          const isSelected = selectedSpecies === option.value;
          // unique key needs to be index if values are duplicated
          return (
            <TouchableOpacity
              key={`${option.value}-${index}`}
              onPress={() => onSpeciesSelect(option.value)}
              activeOpacity={0.7}
              className={`w-[30%] aspect-square mb-4 items-center justify-center rounded-2xl border-2 ${
                isSelected
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <Text className="text-4xl mb-2">{option.icon}</Text>
              <Text className="text-sm font-medium text-white text-center">
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

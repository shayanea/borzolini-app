import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserType } from '../types';

interface StepOneProps {
  selectedUserType: UserType | null;
  onUserTypeSelect: (type: UserType) => void;
}

export function StepOne({ selectedUserType, onUserTypeSelect }: StepOneProps) {
  const options: { label: string; value: UserType }[] = [
    { label: 'Pet Owner', value: 'pet-owner' },
    { label: 'Pet Adopter', value: 'pet-adopter' },
    { label: 'Looking for a New Friend', value: 'companion-seeker' },
  ];

  return (
    <View className="flex-1">
      <Text className="text-3xl font-bold text-gray-900 mb-4">
        Tell us about yourself
      </Text>
      <Text className="text-base text-gray-600 leading-6 mb-8">
        Are you a Pet Owner ready to find loving homes? Or a Pet Adopter looking
        for your new best friend?
      </Text>

      <View className="gap-4">
        {options.map(option => {
          const isSelected = selectedUserType === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => onUserTypeSelect(option.value)}
              activeOpacity={0.7}
              className={`flex-row items-center justify-between p-6 rounded-2xl border-2 ${
                isSelected
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <Text className="text-base font-semibold text-gray-900">
                {option.label}
              </Text>
              <Ionicons
                name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                size={24}
                color={isSelected ? '#f97316' : '#d1d5db'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}


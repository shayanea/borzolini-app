import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../../components/ui/card';
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
      <Text className="text-3xl font-bold text-white mb-4">
        Tell us about yourself
      </Text>
      <Text className="text-base text-white/70 leading-6 mb-8">
        Are you a Pet Owner ready to find loving homes? A Pet Adopter looking for
        your new best friend? Or simply looking to discover the perfect companion
        for your lifestyle?
      </Text>

      <View className="gap-4">
        {options.map(option => {
          const isSelected = selectedUserType === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => onUserTypeSelect(option.value)}
              activeOpacity={0.7}
            >
              <Card
                className={`flex-row items-center justify-between ${
                  isSelected ? 'border-orange-500 bg-white/5' : ''
                }`}
              >
                <Text className="text-base font-semibold text-white">
                  {option.label}
                </Text>
                <Ionicons
                  name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                  size={24}
                  color={isSelected ? '#f97316' : '#52525b'}
                />
              </Card>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}


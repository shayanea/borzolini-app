import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface IntroductionHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

export function IntroductionHeader({
  currentStep,
  totalSteps,
  onBack,
}: IntroductionHeaderProps) {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <View className="px-6 pt-2 pb-6">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity
          onPress={onBack}
          className="p-2 -ml-2 active:opacity-70"
        >
          <Ionicons name="arrow-back" size={24} color="#94a3b8" />
        </TouchableOpacity>
        <Text className="text-sm font-medium text-white">
          {currentStep + 1}/{totalSteps}
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="w-full bg-secondary-800 rounded-full h-1">
        <View
          className="bg-orange-500 h-1 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </View>
    </View>
  );
}

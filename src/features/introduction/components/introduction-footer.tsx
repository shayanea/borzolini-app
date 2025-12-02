import { Text, TouchableOpacity, View } from 'react-native';

interface IntroductionFooterProps {
  onNext: () => void;
  canProceed: boolean;
  isLastStep: boolean;
}

export function IntroductionFooter({
  onNext,
  canProceed,
  isLastStep,
}: IntroductionFooterProps) {
  return (
    <View className="absolute bottom-0 left-0 right-0 p-6 bg-[#17171c] border-t border-secondary-800">
      <TouchableOpacity
        onPress={onNext}
        disabled={!canProceed}
        className={`w-full py-4 rounded-full items-center shadow-lg ${
          canProceed
            ? 'bg-orange-500 shadow-orange-500/30 active:bg-orange-600'
            : 'bg-gray-300 shadow-gray-300/30'
        }`}
      >
        <Text className="text-white font-bold text-base uppercase tracking-wide">
          {isLastStep ? 'Finish' : 'Continue'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

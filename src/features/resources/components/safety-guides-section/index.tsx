import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import safetyIcon from '../../../../../assets/icons/safety.png';

interface SafetyGuideCardProps {
  title: string;
  description: string;
  variant?: 'default' | 'highlight';
  onPress?: () => void;
}


function SafetyGuideCard({
  title,
  description,
  variant = 'default',
  onPress,
}: SafetyGuideCardProps): JSX.Element {
  const showGradient = variant === 'highlight';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="w-[48%]">
      <Card className="px-5 py-4 glass-card h-32 justify-between">
        {/* Gradient + Blur background layers */}
        {showGradient && (
          <LinearGradient
            colors={['rgba(234, 88, 12, 0.2)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        )}

        {showGradient && (
          <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
        )}
        <Text
          className={`text-white font-semibold text-base ${showGradient ? 'text-white' : 'text-white'}`}
        >
          {title}
        </Text>
        <Text className="text-gray-400 text-xs" numberOfLines={2}>
          {description}
        </Text>
      </Card>
    </TouchableOpacity>
  );
}

export function SafetyGuidesSection(): JSX.Element {
  const router = useRouter();

  const handleToxicFoodsPress = () => {
    router.push('/toxicity-guide?tab=foods');
  };

  const handlePlantSafetyPress = () => {
    router.push('/toxicity-guide?tab=plants');
  };

  return (
    <View className="mt-6">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <Image
          source={safetyIcon}
          className="w-6 h-6 mr-2"
          resizeMode="contain"
          style={{ tintColor: '#fb2c36' }}
        />
        <Text className="text-white font-bold text-base">Safety Guides</Text>
      </View>

      {/* Horizontal list */}
      <View className="flex-row flex-wrap gap-3 justify-between">
        <SafetyGuideCard
          title="Toxic Foods"
          description="Chocolate, Grapes, Onions..."
          variant="highlight"
          onPress={handleToxicFoodsPress}
        />
        <SafetyGuideCard
          title="Plant Safety"
          description="Lilies, Aloe, Ivy..."
          onPress={handlePlantSafetyPress}
        />
      </View>
    </View>
  );
}



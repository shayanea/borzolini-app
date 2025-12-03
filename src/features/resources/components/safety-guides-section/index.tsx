import { Image, StyleSheet, Text, View } from 'react-native';

import { BlurView } from 'expo-blur';
import { Card } from '@/components/ui/card';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import safetyIcon from '../../../../../assets/icons/safety.png';

interface SafetyGuideCardProps {
  title: string;
  description: string;
  variant?: 'default' | 'highlight';
}

function SafetyGuideCard({
  title,
  description,
  variant = 'default',
}: SafetyGuideCardProps): JSX.Element {
  const baseClasses = 'w-44 mr-3 justify-between';
  const showGradient = variant === 'highlight';

  return (
    <Card className={`${baseClasses} px-5 py-4 glass-card w-[45%]`}>
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
        className={`text-white font-semibold text-base mb-8 ${showGradient ? 'text-[rgba(234, 88, 12, 0.2)]' : 'text-secondary-400'}`}
      >
        {title}
      </Text>
      <Text className="text-gray-400 text-xs" numberOfLines={2}>
        {description}
      </Text>
    </Card>
  );
}

export function SafetyGuidesSection(): JSX.Element {
  return (
    <View className="mt-6">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <Image
          source={safetyIcon}
          className="w-6 h-6 mr-2"
          resizeMode="contain"
          tintColor="#fb2c36"
        />
        <Text className="text-white font-bold text-base">Safety Guides</Text>
      </View>

      {/* Horizontal list */}
      <View className="flex-row flex-wrap gap-3 justify-between">
        <SafetyGuideCard
          title="Toxic Foods"
          description="Chocolate, Grapes, Onions..."
          variant="highlight"
        />
        <SafetyGuideCard
          title="Plant Safety"
          description="Lilies, Aloe, Ivy..."
        />
      </View>
    </View>
  );
}



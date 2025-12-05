import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { UserLevel } from '../types';

interface TrainingHeaderProps {
  level?: UserLevel | null;
}

export function TrainingHeader({ level }: TrainingHeaderProps) {
  const levelTitle = level
    ? `Level ${level.level}: ${level.title}`
    : 'Level 3: Intermediate Pup';

  return (
    <View className="mb-6">
      <Text className="text-3xl font-bold text-white mb-2">Training Center</Text>
      <View className="flex-row items-center">
        <Ionicons name="star" size={16} color="#9c5cf6" />
        <Text className="text-[#94a3b8] ml-2 text-sm">{levelTitle}</Text>
      </View>
    </View>
  );
}

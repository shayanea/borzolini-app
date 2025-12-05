import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ModuleWithProgress } from '../types';

interface TrainingModuleCardProps {
  module: ModuleWithProgress;
  onPress: () => void;
}

const PLACEHOLDER_COLORS = ['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const styles = StyleSheet.create({
  progressBarActive: {
    backgroundColor: '#9c5cf6',
  },
  progressBarInactive: {
    backgroundColor: 'transparent',
  },
});

export function TrainingModuleCard({ module, onPress }: TrainingModuleCardProps) {
  const progress = module.user_progress?.progress_percentage || 0;
  const duration = module.duration_minutes;

  // Generate a placeholder gradient color based on module id
  const placeholderStyle = useMemo(() => {
    const index = module.id.charCodeAt(0) % PLACEHOLDER_COLORS.length;
    return { backgroundColor: PLACEHOLDER_COLORS[index] };
  }, [module.id]);

  const progressStyle = useMemo(() => ({
    width: `${progress}%` as const,
    ...(progress > 0 ? styles.progressBarActive : styles.progressBarInactive),
  }), [progress]);

  return (
    <Pressable
      className="bg-[#1f1f24] rounded-2xl mb-4 overflow-hidden flex-row items-center p-4 active:opacity-80"
      onPress={onPress}
    >
      {/* Thumbnail / Placeholder */}
      <View className="w-16 h-16 rounded-xl overflow-hidden mr-4">
        {module.thumbnail_url ? (
          <Image
            source={{ uri: module.thumbnail_url }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View
            className="w-full h-full items-center justify-center"
            style={placeholderStyle}
          >
            <Ionicons name="paw" size={28} color="white" />
          </View>
        )}
      </View>

      {/* Content */}
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text
            className="text-white font-semibold text-base flex-1"
            numberOfLines={1}
          >
            {module.title}
          </Text>
          <Text className="text-[#94a3b8] text-xs ml-2">{duration} min</Text>
        </View>

        <Text
          className="text-[#94a3b8] text-sm mb-3"
          numberOfLines={1}
        >
          {module.description || 'No description available'}
        </Text>

        {/* Progress bar */}
        <View className="flex-row items-center">
          <View className="flex-1 h-1.5 bg-[#2a2a30] rounded-full mr-3 overflow-hidden">
            <View
              className="h-full rounded-full"
              style={progressStyle}
            />
          </View>
          <Text className="text-[#94a3b8] text-xs w-10 text-right">
            {progress}%
          </Text>
        </View>
      </View>

      {/* Play button */}
      <View className="ml-3">
        <View className="w-10 h-10 rounded-full border-2 border-[#9c5cf6] items-center justify-center">
          <Ionicons name="play" size={18} color="#9c5cf6" />
        </View>
      </View>
    </Pressable>
  );
}

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { WeeklyChallenge } from '../types';

interface WeeklyChallengeBannerProps {
  challenge?: WeeklyChallenge | null;
  onStartChallenge: () => void;
}

const styles = StyleSheet.create({
  decorativeCircle: {
    backgroundColor: 'white',
  },
});

export function WeeklyChallengeBanner({
  challenge,
  onStartChallenge,
}: WeeklyChallengeBannerProps) {
  // Use mock data if no challenge provided
  const title = challenge?.title || 'Weekly Challenge';
  const description =
    challenge?.description ||
    'Master the "Rollover" command this week to earn the Trickster Badge!';

  return (
    <LinearGradient
      colors={['#7c3aed', '#a855f7', '#c084fc']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-2xl p-5 mb-6 overflow-hidden"
    >
      {/* Decorative circles */}
      <View
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20"
        style={styles.decorativeCircle}
      />
      <View
        className="absolute -bottom-8 -right-4 w-24 h-24 rounded-full opacity-10"
        style={styles.decorativeCircle}
      />

      <View className="flex-row items-start">
        <View className="flex-1">
          <Text className="text-white font-bold text-xl mb-1">{title}</Text>
          <Text className="text-white/80 text-sm leading-5 mb-4">
            {description}
          </Text>
          <Pressable
            className="bg-white self-start px-4 py-2.5 rounded-full active:opacity-80"
            onPress={onStartChallenge}
          >
            <Text className="text-[#7c3aed] font-semibold text-sm">
              Start Challenge
            </Text>
          </Pressable>
        </View>

        <View className="ml-4">
          <View className="bg-white/20 rounded-full p-3">
            <Ionicons name="trophy-outline" size={28} color="white" />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

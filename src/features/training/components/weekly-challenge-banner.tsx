import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { UserChallengeProgress, WeeklyChallenge } from '../types';

interface WeeklyChallengeBannerProps {
  challenge?: WeeklyChallenge | null;
  challengeProgress?: UserChallengeProgress | null;
  onStartChallenge: () => void;
}

const styles = StyleSheet.create({
  decorativeCircle: {
    backgroundColor: 'white',
  },
});

export function WeeklyChallengeBanner({
  challenge,
  challengeProgress,
  onStartChallenge,
}: WeeklyChallengeBannerProps) {
  // Use mock data if no challenge provided
  const title = challenge?.title || 'Weekly Challenge';
  const description =
    challenge?.description ||
    'Master the "Rollover" command this week to earn the Trickster Badge!';

  const isAccepted = challengeProgress !== null;
  const isCompleted = challengeProgress?.status === 'completed';
  const completedSteps = challengeProgress?.completed_steps.length || 0;
  const totalSteps = challenge?.steps.length || 0;
  const progressPercentage =
    totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

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

          {/* Progress indicator if challenge is accepted */}
          {isAccepted && !isCompleted && (
            <View className="mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-white/90 text-xs font-medium">
                  Progress
                </Text>
                <Text className="text-white/90 text-xs font-medium">
                  {completedSteps}/{totalSteps} Steps
                </Text>
              </View>
              <View className="h-2 bg-white/20 rounded-full overflow-hidden">
                <View
                  className="h-full bg-white rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </View>
            </View>
          )}

          {isCompleted && (
            <View className="mb-4 bg-white/20 px-3 py-2 rounded-lg">
              <Text className="text-white font-semibold text-sm">
                🎉 Challenge Completed!
              </Text>
            </View>
          )}

          <Pressable
            className="bg-white self-start px-4 py-2.5 rounded-full active:opacity-80"
            onPress={onStartChallenge}
          >
            <Text className="text-[#7c3aed] font-semibold text-sm">
              {isAccepted
                ? isCompleted
                  ? 'View Challenge'
                  : 'Continue Challenge'
                : 'Start Challenge'}
            </Text>
          </Pressable>
        </View>

        <View className="ml-4">
          <View className="bg-white/20 rounded-full p-3">
            <Ionicons
              name={isCompleted ? 'trophy' : 'trophy-outline'}
              size={28}
              color="white"
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

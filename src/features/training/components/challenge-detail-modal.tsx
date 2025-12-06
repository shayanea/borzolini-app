import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ChallengeStep,
  UserChallengeProgress,
  WeeklyChallenge,
} from '../types';

interface ChallengeDetailModalProps {
  visible: boolean;
  challenge?: WeeklyChallenge | null;
  progress?: UserChallengeProgress | null;
  onClose: () => void;
  onStepPress?: (step: ChallengeStep) => void;
  isCompletingStep?: boolean;
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
});

export function ChallengeDetailModal({
  visible,
  challenge,
  progress,
  onClose,
  onStepPress,
  isCompletingStep = false,
}: ChallengeDetailModalProps) {
  if (!challenge) return null;

  const steps = challenge.steps || [];
  const completedSteps = progress?.completed_steps || [];
  const completedCount = completedSteps.length;
  const totalCount = steps.length;
  const isCompleted = progress?.status === 'completed';

  const isStepCompleted = (stepId: string): boolean => {
    return completedSteps.includes(stepId);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-[#1f1f24] rounded-t-3xl pt-6 pb-10 max-h-[85%]">
          {/* Close button */}
          <Pressable
            className="absolute top-4 right-4 z-10 p-2"
            onPress={onClose}
          >
            <Ionicons name="close" size={24} color="#94a3b8" />
          </Pressable>

          <ScrollView
            className="px-6"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Trophy icon */}
            <View className="items-center mb-4">
              <View className="w-16 h-16 rounded-full border-2 border-[#9c5cf6] items-center justify-center">
                <Ionicons name="trophy-outline" size={32} color="#9c5cf6" />
              </View>
            </View>

            {/* Title */}
            <Text className="text-white text-2xl font-bold mb-1 text-center">
              {challenge.title}
            </Text>
            {challenge.description && (
              <Text className="text-[#94a3b8] text-base mb-6 text-center">
                {challenge.description}
              </Text>
            )}

            {/* Progress Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-[#94a3b8] text-xs font-semibold tracking-wider">
                CHALLENGE STEPS
              </Text>
              <Text className="text-[#94a3b8] text-sm">
                {completedCount}/{totalCount} Completed
              </Text>
            </View>

            {/* Steps List */}
            {steps.map(step => {
              const stepCompleted = isStepCompleted(step.id);
              const isCompleting = isCompletingStep;

              return (
                <Pressable
                  key={step.id}
                  className="bg-[#2a2a30] rounded-xl p-4 mb-3 flex-row items-start"
                  onPress={() =>
                    !stepCompleted && !isCompleting && onStepPress?.(step)
                  }
                  disabled={stepCompleted || isCompleting}
                >
                  <View className="mr-3 mt-0.5">
                    {stepCompleted ? (
                      <View className="w-6 h-6 rounded-full bg-[#10b981] items-center justify-center">
                        <Ionicons name="checkmark" size={16} color="white" />
                      </View>
                    ) : (
                      <View className="w-6 h-6 rounded-full border-2 border-[#94a3b8] items-center justify-center">
                        {isCompleting ? (
                          <ActivityIndicator size="small" color="#9c5cf6" />
                        ) : (
                          <Text className="text-[#9c5cf6] text-xs font-medium">
                            {step.order}
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                  <View className="flex-1">
                    <Text
                      className={`font-semibold text-base mb-1 ${
                        stepCompleted ? 'text-[#4ade80]' : 'text-white'
                      }`}
                    >
                      {step.title}
                    </Text>
                    {step.description && (
                      <Text className="text-[#94a3b8] text-sm">
                        {step.description}
                      </Text>
                    )}
                  </View>
                </Pressable>
              );
            })}

            {/* Reward Card */}
            {challenge.reward_title && (
              <LinearGradient
                colors={['#78350f', '#92400e', '#b45309']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="rounded-xl p-4 mt-2 flex-row items-start"
              >
                <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-3">
                  <Ionicons name="star" size={24} color="#fbbf24" />
                </View>
                <View className="flex-1">
                  <Text className="text-[#fbbf24] font-semibold text-base mb-1">
                    Reward
                  </Text>
                  <Text className="text-white/80 text-sm mb-2">
                    {challenge.reward_title}
                  </Text>
                  {challenge.reward_description && (
                    <Text className="text-white/70 text-xs">
                      {challenge.reward_description}
                    </Text>
                  )}
                  {isCompleted && (
                    <View className="bg-[#10b981] px-3 py-1 rounded-full self-start mt-2">
                      <Text className="text-white text-xs font-semibold">
                        Completed!
                      </Text>
                    </View>
                  )}
                </View>
              </LinearGradient>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

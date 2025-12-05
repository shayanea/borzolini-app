import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { ModuleDetailResponse, StepWithProgress } from '../types';

interface TrainingDetailModalProps {
  visible: boolean;
  moduleDetail?: ModuleDetailResponse | null;
  onClose: () => void;
  onStepPress?: (step: StepWithProgress) => void;
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
});

// Mock data for demo
const mockSteps: StepWithProgress[] = [
  {
    id: '1',
    module_id: '1',
    title: "Master the 'Sit' Command",
    description: 'Dog sits on command without physical prompting.',
    order: 1,
    created_at: '',
    updated_at: '',
    is_completed: true,
  },
  {
    id: '2',
    module_id: '1',
    title: "Hold 'Stay' for 10 seconds",
    description: 'Dog remains in position while you walk away.',
    order: 2,
    created_at: '',
    updated_at: '',
    is_completed: true,
  },
  {
    id: '3',
    module_id: '1',
    title: "Consistent 'Come' Recall",
    description: 'Dog comes immediately when called from 10ft away.',
    order: 3,
    created_at: '',
    updated_at: '',
    is_completed: true,
  },
  {
    id: '4',
    module_id: '1',
    title: 'Loose Leash Walking',
    description: 'Walking without pulling for 5 minutes.',
    order: 4,
    created_at: '',
    updated_at: '',
    is_completed: false,
  },
];

const mockFinalChallenge = {
  title: 'Final Challenge: The Distraction Test',
  description: 'Perform all commands in a busy park environment.',
  reward_title: 'Obedience Master Badge',
  is_locked: true,
};

export function TrainingDetailModal({
  visible,
  moduleDetail,
  onClose,
  onStepPress,
}: TrainingDetailModalProps) {
  // Use mock data if no moduleDetail provided
  const title = moduleDetail?.module?.title || 'Basic Obedience';
  const subtitle = moduleDetail?.module?.description || 'Sit, Stay, Come, and Heel basics.';
  const steps = moduleDetail?.steps || mockSteps;
  const finalChallenge = moduleDetail?.final_challenge || mockFinalChallenge;

  const completedCount = steps.filter((s) => s.is_completed).length;
  const totalCount = steps.length;

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
            {/* Title */}
            <Text className="text-white text-2xl font-bold mb-1">{title}</Text>
            <Text className="text-[#94a3b8] text-base mb-6">{subtitle}</Text>

            {/* Training Steps Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-[#94a3b8] text-xs font-semibold tracking-wider">
                TRAINING STEPS
              </Text>
              <Text className="text-[#94a3b8] text-sm">
                {completedCount}/{totalCount} Completed
              </Text>
            </View>

            {/* Steps List */}
            {steps.map((step) => (
              <Pressable
                key={step.id}
                className="bg-[#2a2a30] rounded-xl p-4 mb-3 flex-row items-start"
                onPress={() => onStepPress?.(step)}
              >
                <View className="mr-3 mt-0.5">
                  {step.is_completed ? (
                    <View className="w-6 h-6 rounded-full bg-[#10b981] items-center justify-center">
                      <Ionicons name="checkmark" size={16} color="white" />
                    </View>
                  ) : (
                    <View className="w-6 h-6 rounded-full border-2 border-[#94a3b8]" />
                  )}
                </View>
                <View className="flex-1">
                  <Text
                    className={`font-semibold text-base mb-1 ${
                      step.is_completed ? 'text-[#4ade80]' : 'text-white'
                    }`}
                  >
                    {step.title}
                  </Text>
                  {step.description && (
                    <Text className="text-[#94a3b8] text-sm">{step.description}</Text>
                  )}
                </View>
              </Pressable>
            ))}

            {/* Final Challenge Card */}
            {finalChallenge && (
              <LinearGradient
                colors={['#78350f', '#92400e', '#b45309']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="rounded-xl p-4 mt-2 flex-row items-start"
              >
                <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-3">
                  <Ionicons name="trophy" size={24} color="#fbbf24" />
                </View>
                <View className="flex-1">
                  <Text className="text-[#fbbf24] font-semibold text-base mb-1">
                    {finalChallenge.title}
                  </Text>
                  <Text className="text-white/80 text-sm mb-2">
                    {finalChallenge.description}
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <Ionicons name="star" size={14} color="#fbbf24" />
                      <Text className="text-[#fbbf24] text-xs ml-1">
                        Reward: {finalChallenge.reward_title}
                      </Text>
                    </View>
                    {finalChallenge.is_locked && (
                      <View className="bg-[#57534e] px-3 py-1 rounded-full">
                        <Text className="text-white text-xs">Locked</Text>
                      </View>
                    )}
                  </View>
                </View>
              </LinearGradient>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

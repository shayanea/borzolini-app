import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { WeeklyChallenge } from '../types';

interface ChallengeModalProps {
  visible: boolean;
  challenge?: WeeklyChallenge | null;
  onClose: () => void;
  onAccept: () => void;
  isAccepting?: boolean;
}

export function ChallengeModal({
  visible,
  challenge,
  onClose,
  onAccept,
  isAccepting = false,
}: ChallengeModalProps) {
  // Use mock data if no challenge provided
  const title = challenge?.title || 'Rollover Challenge';
  const description =
    challenge?.description ||
    'Teach your dog to roll over on command! Complete this by Sunday to earn the exclusive Trickster Badge.';
  const steps = challenge?.steps || [
    { id: '1', order: 1, title: 'Start from "Down" position' },
    { id: '2', order: 2, title: 'Lure head back towards shoulder' },
    { id: '3', order: 3, title: 'Reward when they flop onto side' },
  ];

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-[#1f1f24] rounded-t-3xl pt-6 pb-10 px-6">
          {/* Close button */}
          <Pressable
            className="absolute top-4 right-4 z-10 p-2"
            onPress={onClose}
          >
            <Ionicons name="close" size={24} color="#94a3b8" />
          </Pressable>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Trophy icon */}
            <View className="items-center mb-4">
              <View className="w-16 h-16 rounded-full border-2 border-[#9c5cf6] items-center justify-center">
                <Ionicons name="trophy-outline" size={32} color="#9c5cf6" />
              </View>
            </View>

            {/* Title and description */}
            <Text className="text-white text-2xl font-bold text-center mb-3">
              {title}
            </Text>
            <Text className="text-[#94a3b8] text-center text-base leading-6 mb-6 px-4">
              {description}
            </Text>

            {/* Steps to master */}
            <View className="bg-[#2a2a30] rounded-2xl p-4 mb-6">
              <Text className="text-[#94a3b8] text-xs font-semibold tracking-wider mb-4">
                STEPS TO MASTER
              </Text>
              {steps.map((step) => (
                <View key={step.id} className="flex-row items-center mb-3 last:mb-0">
                  <View className="w-7 h-7 rounded-full border border-[#9c5cf6] items-center justify-center mr-3">
                    <Text className="text-[#9c5cf6] text-sm font-medium">
                      {step.order}
                    </Text>
                  </View>
                  <Text className="text-white text-base flex-1">
                    {step.title}
                  </Text>
                </View>
              ))}
            </View>

            {/* Accept button */}
            <Pressable
              className="bg-[#9c5cf6] rounded-2xl py-4 items-center active:opacity-80"
              onPress={onAccept}
              disabled={isAccepting}
            >
              <Text className="text-white font-semibold text-lg">
                {isAccepting ? 'Accepting...' : 'Accept Challenge'}
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

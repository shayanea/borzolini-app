import { Text, TouchableOpacity, View } from 'react-native';

import { BreedResult } from '@/features/introduction/types/questionnaire';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useRouter } from 'expo-router';

interface ResultMessageProps {
  result: BreedResult;
  isIntermediate?: boolean;
}

export function ResultMessage({ result, isIntermediate }: ResultMessageProps) {
  const router = useRouter();

  return (
    <View className="mb-6">
      <View className="bg-secondary-900 rounded-3xl rounded-tl-sm p-6 mb-4">
        <Text className="text-3xl font-bold text-primary-500 mb-2 text-center">
          {isIntermediate
            ? `${result.name} (Potential Match)`
            : `${result.name} Unlocked! 🎉`}
        </Text>
        <View className="items-center mb-4">
          <View className="bg-secondary-800 px-4 py-2 rounded-full">
            <Text className="text-lg font-semibold text-secondary-50">
              {result.fitScore}% Match
            </Text>
          </View>
        </View>
        <View className="bg-secondary-800 rounded-2xl p-4 mb-4">
          <Text className="text-base text-secondary-50 text-center leading-6">
            {result.why}
          </Text>
          {isIntermediate && (
            <Text className="text-sm text-secondary-300 text-center mt-2 italic">
              Answer a few more questions to refine your match...
            </Text>
          )}
        </View>
        <View className="flex-row flex-wrap justify-center gap-2 mb-6">
          {result.tags
            .slice()
            .sort()
            .map(tag => (
              <View
                key={tag}
                className="bg-secondary-800 px-4 py-2 rounded-full"
              >
                <Text className="text-sm font-medium text-secondary-50">
                  #{tag}
                </Text>
              </View>
            ))}
        </View>

        {/* Action Buttons */}
        {!isIntermediate && (
          <View className="gap-4">
            <TouchableOpacity
              onPress={() => router.push('/map')}
              className="flex-row items-center justify-center gap-2 bg-orange-500 py-4 rounded-2xl active:bg-orange-600"
            >
              <Ionicons name="map-outline" size={20} color="#ffffff" />
              <Text className="text-white font-semibold text-base">
                Learn more about {result.name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

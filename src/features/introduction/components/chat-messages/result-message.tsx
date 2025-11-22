import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BreedResult } from '@/features/introduction/types/questionnaire';

interface ResultMessageProps {
  result: BreedResult;
}

export function ResultMessage({ result }: ResultMessageProps) {
  const router = useRouter();

  return (
    <View className="mb-6">
      <View className="bg-gray-100 rounded-3xl rounded-tl-sm p-6 mb-4">
        <Text className="text-3xl font-bold text-orange-600 mb-2 text-center">
          {result.name} Unlocked! 🎉
        </Text>
        <View className="items-center mb-4">
          <View className="bg-orange-100 px-4 py-2 rounded-full">
            <Text className="text-lg font-semibold text-orange-700">
              {result.fitScore}% Match
            </Text>
          </View>
        </View>
        <View className="bg-gray-50 rounded-2xl p-4 mb-4">
          <Text className="text-base text-gray-900 text-center leading-6">
            {result.why}
          </Text>
        </View>
        <View className="flex-row flex-wrap justify-center gap-2 mb-6">
          {result.tags
            .slice()
            .sort()
            .map(tag => (
              <View key={tag} className="bg-orange-100 px-4 py-2 rounded-full">
                <Text className="text-sm font-medium text-orange-800">
                  #{tag}
                </Text>
              </View>
            ))}
        </View>

        {/* Action Buttons */}
        <View className="gap-4">
          <TouchableOpacity
            onPress={() => router.push('/map')}
            className="flex-row items-center justify-center gap-2 bg-orange-500 py-4 rounded-2xl active:bg-orange-600"
          >
            <Ionicons name="map-outline" size={20} color="#ffffff" />
            <Text className="text-white font-semibold text-base">
              Find near clinics
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

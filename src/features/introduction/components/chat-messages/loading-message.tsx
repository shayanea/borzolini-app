import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export function LoadingMessage() {
  return (
    <View className="mb-4">
      <View className="bg-gray-100 rounded-3xl rounded-tl-sm p-4 max-w-[85%]">
        <View className="flex-row items-center gap-2">
          <ActivityIndicator size="small" color="#6b7280" />
          <Text className="text-sm text-gray-600">Thinking...</Text>
        </View>
      </View>
    </View>
  );
}

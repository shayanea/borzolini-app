import React from 'react';
import { View, Text } from 'react-native';

interface AnswerMessageProps {
  answer: string;
}

export function AnswerMessage({ answer }: AnswerMessageProps) {
  return (
    <View className="mb-4 items-end">
      <View className="bg-orange-500 rounded-3xl rounded-tr-sm p-4 max-w-[85%]">
        <Text className="text-base font-medium text-white">{answer}</Text>
      </View>
    </View>
  );
}

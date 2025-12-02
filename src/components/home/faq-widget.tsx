import { FaqService } from '@/services/faq';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { LayoutAnimation, Platform, Text, TouchableOpacity, UIManager, View } from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function FaqWidget() {
  const [expandedId, setExpandedId] = useState<string | null>('3'); // Default open as per screenshot example (or none)

  const { data: faqs, isLoading } = useQuery({
    queryKey: ['faqs'],
    queryFn: FaqService.getAll,
  });

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  if (isLoading) {
    return (
      <View className="mt-6">
        <View className="flex-row items-center mb-3">
          <Ionicons name="help-circle-outline" size={20} color="#60a5fa" />
          <Text className="text-white font-bold text-lg ml-2">Frequent Questions</Text>
        </View>
        <View className="bg-[#2a2a30] rounded-2xl p-4 h-40 items-center justify-center">
          <Text className="text-gray-400">Loading questions...</Text>
        </View>
      </View>
    );
  }

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <View className="mt-6 mb-8">
      <View className="flex-row items-center mb-3">
        <Ionicons name="help-circle-outline" size={20} color="#60a5fa" />
        <Text className="text-white font-bold text-lg ml-2">Frequent Questions</Text>
      </View>

      <View className="bg-[#2a2a30] rounded-2xl overflow-hidden">
        {faqs.map((faq, index) => {
          const isExpanded = expandedId === faq.id;
          const isLast = index === faqs.length - 1;

          return (
            <View key={faq.id}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleExpand(faq.id)}
                className={`p-4 ${!isLast ? 'border-b border-gray-700/50' : ''}`}
              >
                <View className="flex-row justify-between items-center">
                  <Text className="text-white font-medium flex-1 mr-4">
                    {faq.question}
                  </Text>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color="#9ca3af"
                  />
                </View>
                
                {isExpanded && (
                  <View className="mt-3">
                    <Text className="text-gray-400 leading-5">
                      {faq.answer}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}

import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrainingActivity } from '../types';

interface ActivityDetailProps {
  activity: TrainingActivity | null;
  visible: boolean;
  onClose: () => void;
  onComplete: (notes?: string) => void;
  isCompleting?: boolean;
}

export function ActivityDetail({ 
  activity, 
  visible, 
  onClose, 
  onComplete,
  isCompleting 
}: ActivityDetailProps) {
  const [notes, setNotes] = useState('');

  if (!activity) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row justify-between items-center px-4 py-2 border-b border-gray-100">
          <TouchableOpacity onPress={onClose} className="p-2">
            <MaterialCommunityIcons name="close" size={24} color="#64748b" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-secondary-900">Activity Details</Text>
          <View className="w-10" /> 
        </View>

        <ScrollView className="flex-1 px-6 py-4">
          <Text className="text-2xl font-bold text-secondary-900 mb-2">
            {activity.title}
          </Text>
          
          <View className="flex-row flex-wrap gap-2 mb-6">
            <View className="bg-primary-100 px-3 py-1 rounded-full">
              <Text className="text-primary-700 font-medium capitalize">
                {activity.difficulty}
              </Text>
            </View>
            {activity.avg_duration_minutes && (
              <View className="bg-secondary-100 px-3 py-1 rounded-full">
                <Text className="text-secondary-700">
                  {activity.avg_duration_minutes} min
                </Text>
              </View>
            )}
          </View>

          <Text className="text-lg font-semibold text-secondary-900 mb-2">
            Instructions
          </Text>
          
          {/* TODO: Replace with Markdown renderer */}
          <View className="bg-secondary-50 p-4 rounded-xl mb-6">
            <Text className="text-secondary-700 leading-6">
              {activity.content_markdown}
            </Text>
          </View>

          {activity.equipment && activity.equipment.length > 0 && (
            <View className="mb-6">
              <Text className="text-lg font-semibold text-secondary-900 mb-2">
                Equipment Needed
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {activity.equipment.map((item, index) => (
                  <View key={index} className="bg-gray-100 px-3 py-1 rounded-lg">
                    <Text className="text-gray-700">{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View className="mb-8">
            <Text className="text-lg font-semibold text-secondary-900 mb-2">
              Notes (Optional)
            </Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-xl p-4 h-32 text-secondary-900"
              placeholder="How did it go? Any difficulties?"
              multiline
              textAlignVertical="top"
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </ScrollView>

        <View className="p-4 border-t border-gray-100">
          <TouchableOpacity
            onPress={() => onComplete(notes)}
            disabled={isCompleting}
            className={`w-full py-4 rounded-xl items-center ${
              isCompleting ? 'bg-primary-300' : 'bg-primary-500'
            }`}
          >
            <Text className="text-white font-bold text-lg">
              {isCompleting ? 'Completing...' : 'Mark as Complete'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

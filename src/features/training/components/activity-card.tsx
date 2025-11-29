import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ActivityDifficulty, TrainingActivity } from '../types';

interface ActivityCardProps {
  activity: TrainingActivity;
  onPress: () => void;
  isCompleted?: boolean;
}

export function ActivityCard({ activity, onPress, isCompleted }: ActivityCardProps) {
  const getDifficultyColor = (difficulty: ActivityDifficulty) => {
    switch (difficulty) {
      case ActivityDifficulty.EASY:
        return 'text-green-600 bg-green-100';
      case ActivityDifficulty.MODERATE:
        return 'text-yellow-600 bg-yellow-100';
      case ActivityDifficulty.ADVANCED:
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-white rounded-xl p-4 mb-3 shadow-sm border ${
        isCompleted ? 'border-green-500' : 'border-transparent'
      }`}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1 mr-4">
          <Text className="text-lg font-semibold text-secondary-900 mb-1">
            {activity.title}
          </Text>
          <Text className="text-secondary-600 text-sm mb-3" numberOfLines={2}>
            {activity.summary}
          </Text>
          
          <View className="flex-row flex-wrap gap-2">
            <View className={`px-2 py-1 rounded-full ${getDifficultyColor(activity.difficulty)}`}>
              <Text className="text-xs font-medium capitalize">
                {activity.difficulty}
              </Text>
            </View>
            
            {activity.avg_duration_minutes && (
              <View className="flex-row items-center px-2 py-1 rounded-full bg-secondary-100">
                <MaterialCommunityIcons name="clock-outline" size={12} color="#475569" />
                <Text className="text-xs text-secondary-700 ml-1">
                  {activity.avg_duration_minutes} min
                </Text>
              </View>
            )}

            {activity.indoor !== null && (
              <View className="flex-row items-center px-2 py-1 rounded-full bg-blue-50">
                <MaterialCommunityIcons 
                  name={activity.indoor ? "home-outline" : "tree-outline"} 
                  size={12} 
                  color="#0ea5e9" 
                />
                <Text className="text-xs text-blue-700 ml-1">
                  {activity.indoor ? 'Indoor' : 'Outdoor'}
                </Text>
              </View>
            )}
          </View>
        </View>

        {isCompleted && (
          <View className="bg-green-100 rounded-full p-1">
            <MaterialCommunityIcons name="check" size={20} color="#16a34a" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { Resource, ResourceType } from '../types';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const handlePress = () => {
    Linking.openURL(resource.url).catch(err =>
      console.error('Failed to open URL:', err)
    );
  };

  const getIcon = () => {
    switch (resource.type) {
      case ResourceType.VIDEO:
        return { name: 'youtube', color: '#fb0000' };
      case ResourceType.DISCORD:
        return { name: 'chat', color: '#5865f2' };
      case ResourceType.AUDIO:
        return { name: 'headphones', color: '#8b5cf6' };
      default:
        return { name: 'file-document-outline', color: '#fb8500' };
    }
  };

  const icon = getIcon();

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center p-4 bg-white rounded-xl mb-3 shadow-sm"
    >
      <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center">
        <MaterialCommunityIcons
          name={icon.name as any}
          size={24}
          color={icon.color}
        />
      </View>
      
      <View className="ml-4 flex-1">
        <Text className="text-secondary-900 font-medium text-base mb-1">
          {resource.title}
        </Text>
        {resource.description && (
          <Text className="text-secondary-600 text-sm" numberOfLines={2}>
            {resource.description}
          </Text>
        )}
      </View>

      <MaterialCommunityIcons
        name="open-in-new"
        size={20}
        color="#94a3b8"
      />
    </TouchableOpacity>
  );
}

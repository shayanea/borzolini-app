import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { QUERY_KEYS, createStandardQueryHook } from '@/hooks/utils/query-utils';
import { Resource, ResourceType } from '@/features/resources/types';

import { Card } from '@/components/ui/card';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import discordIcon from '../../../../../assets/icons/discords.png';
import { resourcesService } from '@/features/resources/services/resources.service';

const useDiscordResourcesQuery = createStandardQueryHook<Resource[]>(
  QUERY_KEYS.resources.byType(ResourceType.DISCORD),
  () => resourcesService.getResourcesByType(ResourceType.DISCORD),
  {
    context: 'Discord resources',
  }
);

export function DiscordCommunitySection(): JSX.Element | null {
  const { data, isLoading, isError } = useDiscordResourcesQuery();

  const isDataAvailable = isLoading || isError || !data || data.length === 0;
  if (isDataAvailable) {
    return null;
  }

  const resource: Resource = data[0];

  const handlePress = (): void => {
    void Linking.openURL(resource.url);
  };

  const initial = resource.title?.charAt(0).toUpperCase() ?? 'D';

  return (
    <View className="mt-8">
      {/* Header */}
      <View className="flex-row items-center mb-3">
        <Image source={discordIcon} className="w-6 h-6" resizeMode="contain" />
        <Text className="text-white font-bold text-sm ml-2">Community</Text>
      </View>

      {/* Card */}
      <Card className=" border-white/10 px-4 py-3">
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.85}
          className="flex-row items-center justify-between"
        >
          {/* Left: avatar + text */}
          <View className="flex-row items-center flex-1">
            <View className="w-9 h-9 rounded-full bg-[#4f46e5] items-center justify-center mr-3">
              <Text className="text-white font-semibold text-sm">
                {initial}
              </Text>
            </View>

            <View className="flex-1">
              <Text
                className="text-white text-sm font-semibold"
                numberOfLines={1}
              >
                {resource.title}
              </Text>
              <Text className="text-gray-400 text-xs" numberOfLines={1}>
                {resource.description ?? 'Join 12k+ pet owners'}
              </Text>
            </View>
          </View>

          {/* Right: external icon */}
          <Ionicons name="open-outline" size={16} color="#9ca3af" />
        </TouchableOpacity>
      </Card>
    </View>
  );
}



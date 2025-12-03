import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { QUERY_KEYS, createStandardQueryHook } from '@/hooks/utils/query-utils';
import { Resource, ResourceType } from '@/features/resources/types';

import { Card } from '@/components/ui/card';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { resourcesService } from '@/features/resources/services/resources.service';
import videoIcon from '../../../../../assets/icons/youtube.png';

const useVideoResourcesQuery = createStandardQueryHook<Resource[]>(
  QUERY_KEYS.resources.byType(ResourceType.VIDEO),
  () => resourcesService.getResourcesByType(ResourceType.VIDEO),
  {
    context: 'Video resources',
  }
);

export function VideoGuidesSection(): JSX.Element | null {
  const { data, isLoading, isError } = useVideoResourcesQuery();

  const isDataAvailable = isLoading || isError || !data || data.length === 0;
  if (isDataAvailable) {
    return null;
  }

  return (
    <View className="mt-8">
      {/* Header */}
      <View className="flex-row items-center mb-3">
        <Image source={videoIcon} className="w-6 h-6" resizeMode="contain" />
        <Text className="text-white font-bold text-sm ml-2">Video Guides</Text>
      </View>

      {/* Horizontal list */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="pr-6"
      >
        {data.map(resource => (
          <VideoCard key={resource.id} resource={resource} />
        ))}
      </ScrollView>
    </View>
  );
}

interface VideoCardProps {
  resource: Resource;
}

function VideoCard({ resource }: VideoCardProps): JSX.Element {
  const handlePress = (): void => {
    if (!resource.url) {
      return;
    }

    void Linking.openURL(resource.url);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={handlePress}
      className="mr-4 w-52"
    >
      {/* Thumbnail card fills container like YouTube */}
      <Card className="!p-0 overflow-hidden bg-[#020617] border-white/5 mb-2">
        <View className="w-full aspect-video bg-[#020617] relative">
          {resource.cover ? (
            <Image
              source={{ uri: resource.cover }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Ionicons name="play-circle" size={32} color="#f97316" />
            </View>
          )}

          {/* Play icon overlay */}
          <View className="absolute inset-0 w-full h-full items-center justify-center bg-black/40">
            <View className="w-10 h-10 rounded-full bg-black/40 items-center justify-center">
              <Ionicons name="play" size={18} color="#ffffff" />
            </View>
          </View>
        </View>
      </Card>

      {/* Title and description below, outside the card */}
      <View className="px-1">
        <Text
          className="text-white font-semibold text-sm mb-0.5"
          numberOfLines={2}
        >
          {resource.title}
        </Text>
        {resource.description ? (
          <Text className="text-gray-400 text-xs" numberOfLines={2}>
            {resource.description}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}



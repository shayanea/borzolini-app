import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import { ResourceCard } from './resource-card';
import { resourcesService } from '../services/resources.service';
import { Resource, ResourceType } from '../types';

export function ResourcesList() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchResources = useCallback(async () => {
    try {
      const data = await resourcesService.getActiveResources();
      setResources(data);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchResources();
    }, [fetchResources])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchResources();
  }, [fetchResources]);

  const groupResources = (type: ResourceType) => {
    return resources.filter(r => r.type === type);
  };

  const videos = groupResources(ResourceType.VIDEO);
  const discord = groupResources(ResourceType.DISCORD);
  const audio = groupResources(ResourceType.AUDIO);
  // Any other types or fallback
  const others = resources.filter(r => 
    ![ResourceType.VIDEO, ResourceType.DISCORD, ResourceType.AUDIO].includes(r.type)
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#fb8500" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="px-6 py-6"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#fb8500']} />
      }
    >
      <View className="mb-6">
        <Text className="text-3xl font-bold text-secondary-900 mb-2">
          Resources
        </Text>
        <Text className="text-secondary-600">
          Knowledge base and community support
        </Text>
      </View>

      {videos.length > 0 && (
        <View className="mb-6">
          <Text className="text-lg font-semibold text-secondary-900 mb-3">
            Videos & Guides
          </Text>
          {videos.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </View>
      )}

      {discord.length > 0 && (
        <View className="mb-6">
          <Text className="text-lg font-semibold text-secondary-900 mb-3">
            Community
          </Text>
          {discord.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </View>
      )}

      {audio.length > 0 && (
        <View className="mb-6">
          <Text className="text-lg font-semibold text-secondary-900 mb-3">
            Audio & Podcasts
          </Text>
          {audio.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </View>
      )}

      {others.length > 0 && (
        <View className="mb-6">
          <Text className="text-lg font-semibold text-secondary-900 mb-3">
            Other Resources
          </Text>
          {others.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </View>
      )}

      {resources.length === 0 && !loading && (
        <View className="bg-white rounded-xl p-8 items-center justify-center shadow-sm">
          <Text className="text-lg font-semibold text-secondary-900 mb-2">
            No Resources Yet
          </Text>
          <Text className="text-secondary-600 text-center">
            Check back later for new content.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

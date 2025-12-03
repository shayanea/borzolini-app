import { BreedDetailHeader } from '@/components/breed-detail/breed-detail-header';
import { BreedDetailTabs, TabKey } from '@/components/breed-detail/breed-detail-tabs';
import { HealthTab } from '@/components/breed-detail/tabs/health-tab';
import { OverviewTab } from '@/components/breed-detail/tabs/overview-tab';
import { StatsTab } from '@/components/breed-detail/tabs/stats-tab';
import { useBreedById } from '@/services/breeds';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BreedDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const { data: breed, isLoading, error } = useBreedById(id!);

  const handleFavorite = () => {
    // TODO: Implement favorite functionality
    console.log('Favorite pressed');
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share pressed');
  };

  const renderTabContent = () => {
    if (!breed) return null;

    switch (activeTab) {
      case 'overview':
        return <OverviewTab breed={breed} />;
      case 'stats':
        return <StatsTab breed={breed} />;
      case 'health':
        return <HealthTab breed={breed} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-[#17171c] items-center justify-center">
        <ActivityIndicator size="large" color="#9c5cf6" />
        <Text className="text-white/60 mt-4">Loading breed details...</Text>
      </SafeAreaView>
    );
  }

  if (error || !breed) {
    return (
      <SafeAreaView className="flex-1 bg-[#17171c] items-center justify-center px-6">
        <Text className="text-white text-lg font-semibold mb-2">
          Unable to load breed details
        </Text>
        <Text className="text-white/60 text-center mb-4">
          {error?.message || 'Breed not found'}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#17171c]" edges={['bottom']}>
      <BreedDetailHeader
        breed={breed}
        onBack={() => router.back()}
        onFavorite={handleFavorite}
        onShare={handleShare}
      />
      
      <BreedDetailTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      <View className="flex-1 pt-4">
        {renderTabContent()}
      </View>
    </SafeAreaView>
  );
}

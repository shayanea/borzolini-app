import {
  DiscordCommunitySection,
  NearbyServicesSection,
  ResourceHeader,
  SafetyGuidesSection,
  VideoGuidesSection,
} from '@/features/resources/components';

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

export default function ResourcesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#17171c]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pt-6 pb-24"
        showsVerticalScrollIndicator={false}
      >
        <ResourceHeader />
        <SafetyGuidesSection />
        <NearbyServicesSection />
        <DiscordCommunitySection />
        <VideoGuidesSection />
      </ScrollView>
    </SafeAreaView>
  );
}

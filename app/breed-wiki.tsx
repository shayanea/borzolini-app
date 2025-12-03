import {
  AllBreedsSection,
  BreedWikiHeader,
  PopularBreedsSection,
} from '@/features/breed-wiki/components';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

export default function BreedWikiScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#17171c]">
      <BreedWikiHeader />

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-24"
        showsVerticalScrollIndicator={false}
      >
        <PopularBreedsSection />
        <AllBreedsSection />
      </ScrollView>
    </SafeAreaView>
  );
}

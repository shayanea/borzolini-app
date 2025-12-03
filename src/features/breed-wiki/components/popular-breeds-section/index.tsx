import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Breed } from '@/types/pet';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { usePopularCatBreeds } from '@/services/breeds';

export function PopularBreedsSection(): JSX.Element | null {
  const { data, isLoading, isError } = usePopularCatBreeds(8);

  if (isLoading) {
    return (
      <View className="px-6 mt-6">
        <View className="flex-row items-center mb-4">
          <Ionicons name="funnel" size={20} color="#a855f7" />
          <Text className="text-white font-bold text-lg ml-2">
            Popular Breeds
          </Text>
        </View>
        <View className="items-center py-8">
          <ActivityIndicator size="large" color="#a855f7" />
        </View>
      </View>
    );
  }

  const isDataAvailable = isLoading || isError || !data || data.length === 0;
  if (isDataAvailable) {
    return null;
  }

  return (
    <View className="px-6 mt-6">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <Ionicons name="funnel-outline" size={20} color="#a855f7" />
        <Text className="text-white font-bold text-lg ml-2">
          Popular Breeds
        </Text>
      </View>

      {/* Horizontal list */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="pr-6"
      >
        {data.map(breed => (
          <BreedCard key={breed.id} breed={breed} />
        ))}
      </ScrollView>
    </View>
  );
}

interface BreedCardProps {
  breed: Breed;
}

function BreedCard({ breed }: BreedCardProps): JSX.Element {
  return (
    <TouchableOpacity activeOpacity={0.85} className="mr-4 w-40">
      <View className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#232328] relative">
        {breed.image_url ? (
          <Image
            source={{ uri: breed.image_url }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="flex-1 items-center justify-center bg-[#232328]">
            <Ionicons name="paw" size={32} color="#6b7280" />
          </View>
        )}

        {/* Gradient overlay at bottom for text readability */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0, y: 1 }}
          className="absolute bottom-0 left-0 right-0 h-20"
        />

        {/* Breed name overlay */}
        <View className="absolute bottom-0 left-0 right-0 p-3">
          <Text className="text-white font-semibold text-sm" numberOfLines={1}>
            {breed.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

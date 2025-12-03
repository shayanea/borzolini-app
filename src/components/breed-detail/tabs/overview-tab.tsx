import { Breed } from '@/types/pet';
import { ScrollView, Text, View } from 'react-native';
import { InfoCard } from '../info-card';

interface OverviewTabProps {
  breed: Breed;
}

export function OverviewTab({ breed }: OverviewTabProps) {
  // Parse temperament traits from comma-separated string
  const temperamentTraits = breed.temperament
    ? breed.temperament.split(',').map(t => t.trim()).filter(Boolean)
    : [];

  return (
    <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
      {/* About Section */}
      <View className="mb-6">
        <View className="flex-row items-center mb-3">
          <View className="w-1 h-6 bg-[#9c5cf6] rounded-full mr-3" />
          <Text className="text-white text-lg font-semibold">About</Text>
        </View>
        <Text className="text-white/70 text-base leading-6">
          {breed.description || 'No description available for this breed.'}
        </Text>
      </View>

      {/* Temperament Section */}
      {temperamentTraits.length > 0 && (
        <View className="mb-6">
          <View className="flex-row items-center mb-3">
            <View className="w-1 h-6 bg-[#9c5cf6] rounded-full mr-3" />
            <Text className="text-white text-lg font-semibold">Temperament</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {temperamentTraits.map((trait, index) => (
              <View 
                key={index} 
                className="bg-white/10 px-4 py-2 rounded-full border border-white/20"
              >
                <Text className="text-white text-sm">{trait}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Weight & Lifespan Cards */}
      <View className="flex-row gap-3 mb-6">
        <InfoCard
          icon="scale-outline"
          label="Weight"
          value={`${breed.weight_min}-${breed.weight_max} pounds`}
        />
        <InfoCard
          icon="heart-outline"
          label="Lifespan"
          value={`${breed.life_expectancy_min}-${breed.life_expectancy_max} years`}
        />
      </View>
    </ScrollView>
  );
}

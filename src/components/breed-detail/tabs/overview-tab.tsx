import { Breed } from '@/types/pet';
import { Ionicons } from '@expo/vector-icons';
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
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      {/* About Section */}
      <View className="bg-[#232328] rounded-2xl p-4 mb-4">
        <View className="flex-row items-center mb-3">
          <Ionicons name="information-circle-outline" size={20} color="#fff" />
          <Text className="text-white text-base font-semibold ml-2">About</Text>
        </View>
        <Text className="text-white/60 text-sm leading-5">
          {breed.description || 'No description available for this breed.'}
        </Text>
      </View>

      {/* Temperament Section */}
      {temperamentTraits.length > 0 && (
        <View className="bg-[#232328] rounded-2xl p-4 mb-4">
          <View className="flex-row items-center mb-3">
            <Text className="text-lg">✨</Text>
            <Text className="text-white text-base font-semibold ml-2">Temperament</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {temperamentTraits.map((trait, index) => (
              <View 
                key={index} 
                className="bg-[#17171c] px-3 py-2 rounded-full border border-white/10"
              >
                <Text className="text-white text-xs">{trait}</Text>
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
          icon="time-outline"
          label="Lifespan"
          value={`${breed.life_expectancy_min}-${breed.life_expectancy_max} years`}
        />
      </View>
    </ScrollView>
  );
}

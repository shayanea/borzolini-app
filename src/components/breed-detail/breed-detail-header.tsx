import { Breed } from '@/types/pet';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

interface BreedDetailHeaderProps {
  breed: Breed;
  onBack: () => void;
  onFavorite?: () => void;
  onShare?: () => void;
}

export function BreedDetailHeader({ 
  breed, 
  onBack, 
  onFavorite, 
  onShare 
}: BreedDetailHeaderProps) {
  // Determine breed group/category based on size or species
  const getBreedGroup = () => {
    if (breed.size_category) {
      return breed.size_category.charAt(0).toUpperCase() + breed.size_category.slice(1);
    }
    return breed.species === 'dog' ? 'Non-Sporting' : 'Sporting';
  };

  return (
    <View className="h-80">
      <ImageBackground
        source={{ uri: breed.image_url || 'https://via.placeholder.com/400' }}
        className="h-full w-full"
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(23,23,28,0.8)', '#17171c']}
          className="h-full w-full"
        >
          {/* Top Action Buttons */}
          <View className="flex-row justify-between items-center px-6 pt-12">
            <TouchableOpacity
              onPress={onBack}
              className="w-10 h-10 rounded-full bg-black/40 items-center justify-center"
            >
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>
            
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={onFavorite}
                className="w-10 h-10 rounded-full bg-black/40 items-center justify-center"
              >
                <Ionicons name="heart-outline" size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onShare}
                className="w-10 h-10 rounded-full bg-black/40 items-center justify-center"
              >
                <Ionicons name="share-social-outline" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Breed Info at Bottom */}
          <View className="absolute bottom-0 left-0 right-0 px-6 pb-6">
            {/* Group Badge */}
            <View className="self-start mb-3">
              <View className="bg-[#9c5cf6] px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-medium">{getBreedGroup()}</Text>
              </View>
            </View>
            
            {/* Breed Name */}
            <Text className="text-white text-3xl font-bold mb-2">{breed.name}</Text>
            
            {/* Origin */}
            <Text className="text-white/80 text-base">{breed.origin_country || 'Unknown Origin'}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

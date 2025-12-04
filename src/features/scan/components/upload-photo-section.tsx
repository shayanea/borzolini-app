import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface UploadPhotoSectionProps {
  onChoosePhoto: () => void;
  isLoading?: boolean;
}

const styles = StyleSheet.create({
  gradientButton: {
    borderRadius: 12,
  },
});

export function UploadPhotoSection({ onChoosePhoto, isLoading = false }: UploadPhotoSectionProps) {
  return (
    <View className="bg-[#232328] border border-white/10 rounded-2xl p-6 mb-8">
      {/* Upload Icon */}
      <View className="items-center mb-4">
        <View className="w-14 h-14 rounded-full bg-[#2a2a30] items-center justify-center">
          <Ionicons name="cloud-upload-outline" size={28} color="#9ca3af" />
        </View>
      </View>

      {/* Title & Subtitle */}
      <View className="items-center mb-5">
        <Text className="text-white font-bold text-lg mb-1">Upload Pet Photo</Text>
        <Text className="text-gray-400 text-sm text-center">
          Scan a recent photo for detailed AI analysis
        </Text>
      </View>

      {/* Choose Photo Button */}
      <TouchableOpacity
        onPress={onChoosePhoto}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#10b981', '#059669']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="rounded-xl py-4 items-center"
          style={styles.gradientButton}
        >
          <Text className="text-white font-bold text-base">
            {isLoading ? 'Uploading...' : 'Choose Photo'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

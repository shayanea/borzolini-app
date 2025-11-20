import { router } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUpdateProfile } from '@/services/user';

type UserType = 'pet-owner' | 'pet-adopter' | 'companion-seeker' | null;

export default function IntroductionScreen() {
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const handleUserTypeSelect = async (userType: UserType) => {
    try {
      // Update profile with selected user type (storing in notes for now as an example)
      // In a real app, this would map to specific profile fields
      await updateProfile({ 
        notes: `User Type: ${userType}`
      });
      
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Error', 'Failed to save selection. Please try again.');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerClassName="flex-grow px-6 py-12"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center">
          <Text className="text-3xl font-bold text-secondary-900 mb-4 text-center">
            Welcome to Pet Clinic
          </Text>
          <Text className="text-secondary-600 text-center mb-8">
            Tell us about yourself to get started
          </Text>

          <View className="mb-6">
            <TouchableOpacity
              className={`w-full bg-primary-50 border-2 border-primary-500 rounded-xl p-6 mb-4 ${isPending ? 'opacity-50' : ''}`}
              onPress={() => handleUserTypeSelect('pet-owner')}
              disabled={isPending}
            >
              <Text className="text-xl font-semibold text-secondary-900 mb-2">
                Pet Owner
              </Text>
              <Text className="text-secondary-600">
                I have pets and want to manage their health
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`w-full bg-secondary-50 border-2 border-secondary-300 rounded-xl p-6 mb-4 ${isPending ? 'opacity-50' : ''}`}
              onPress={() => handleUserTypeSelect('pet-adopter')}
              disabled={isPending}
            >
              <Text className="text-xl font-semibold text-secondary-900 mb-2">
                Pet Adopter
              </Text>
              <Text className="text-secondary-600">
                I'm looking to adopt a pet
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`w-full bg-secondary-50 border-2 border-secondary-300 rounded-xl p-6 ${isPending ? 'opacity-50' : ''}`}
              onPress={() => handleUserTypeSelect('companion-seeker')}
              disabled={isPending}
            >
              <Text className="text-xl font-semibold text-secondary-900 mb-2">
                Companion Seeker
              </Text>
              <Text className="text-secondary-600">
                I want to learn more about pet care
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleSkip} disabled={isPending}>
            <Text className="text-primary-600 text-center text-sm">
              Skip for now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


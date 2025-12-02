import { useAuth } from '@/hooks/use-auth';
import { Ionicons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-[#17171c]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 py-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-gray-400 text-sm mb-1">Welcome back,</Text>
            <MaskedView
              maskElement={
                <Text className="text-2xl font-bold">
                  {user?.firstName} 
                </Text>
              }
            >
              <LinearGradient
                colors={['#a855f7', '#ec4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className="text-2xl font-bold opacity-0">
                  {user?.firstName}
                </Text>
              </LinearGradient>
            </MaskedView>
          </View>
          
          <TouchableOpacity className="w-10 h-10 rounded-full bg-[#2a2a30] items-center justify-center">
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


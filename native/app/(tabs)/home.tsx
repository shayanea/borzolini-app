import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/use-auth';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 py-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-secondary-900 mb-2">
            Hello, {user?.firstName || 'there'}!
          </Text>
          <Text className="text-secondary-600">
            Daily overview and quick updates
          </Text>
        </View>

        {/* Active Training Streak */}
        <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-secondary-900">
              Active Training Streak
            </Text>
            <MaterialCommunityIcons
              name="fire"
              size={24}
              color="#fb8500"
            />
          </View>
          <Text className="text-3xl font-bold text-primary-600 mb-2">7</Text>
          <Text className="text-secondary-600">days in a row</Text>
        </View>

        {/* Upcoming Health Tasks */}
        <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-secondary-900 mb-4">
            Upcoming Health Tasks
          </Text>
          <View>
            <View className="flex-row items-center justify-between py-2 border-b border-secondary-100 mb-3">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={20}
                  color="#fb8500"
                />
                <Text className="ml-3 text-secondary-900">
                  Vaccination Due
                </Text>
              </View>
              <Text className="text-secondary-600 text-sm">Tomorrow</Text>
            </View>
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="weight"
                  size={20}
                  color="#64748b"
                />
                <Text className="ml-3 text-secondary-900">
                  Weight Check
                </Text>
              </View>
              <Text className="text-secondary-600 text-sm">In 3 days</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="bg-white rounded-xl p-6 shadow-sm">
          <Text className="text-lg font-semibold text-secondary-900 mb-4">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap gap-3">
            <TouchableOpacity className="bg-primary-50 px-4 py-3 rounded-lg flex-1 min-w-[45%]">
              <MaterialCommunityIcons
                name="camera"
                size={24}
                color="#fb8500"
              />
              <Text className="text-primary-600 font-medium mt-2">
                Skin Scan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-secondary-100 px-4 py-3 rounded-lg flex-1 min-w-[45%]">
              <MaterialCommunityIcons
                name="school"
                size={24}
                color="#64748b"
              />
              <Text className="text-secondary-700 font-medium mt-2">
                Start Training
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


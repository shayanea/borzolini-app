import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TrainingScreen() {
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
            Training Center
          </Text>
          <Text className="text-secondary-600">
            Access training modules and start sessions
          </Text>
        </View>

        {/* Featured Quick Action */}
        <TouchableOpacity className="bg-primary-500 rounded-xl p-8 mb-6 shadow-md">
          <View className="items-center">
            <MaterialCommunityIcons
              name="school"
              size={48}
              color="#ffffff"
            />
            <Text className="text-white text-2xl font-bold mt-4 mb-2">
              Start Training Session
            </Text>
            <Text className="text-primary-100 text-center">
              Begin a new training module
            </Text>
          </View>
        </TouchableOpacity>

        {/* Training Modules */}
        <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-secondary-900 mb-4">
            Available Modules
          </Text>
          <View>
            <TouchableOpacity className="flex-row items-center p-4 bg-secondary-50 rounded-lg mb-3">
              <MaterialCommunityIcons
                name="book-open-variant"
                size={24}
                color="#fb8500"
              />
              <View className="ml-4 flex-1">
                <Text className="text-secondary-900 font-medium">
                  Basic Commands
                </Text>
                <Text className="text-secondary-600 text-sm">
                  Learn fundamental commands
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#94a3b8"
              />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4 bg-secondary-50 rounded-lg mb-3">
              <MaterialCommunityIcons
                name="dog"
                size={24}
                color="#fb8500"
              />
              <View className="ml-4 flex-1">
                <Text className="text-secondary-900 font-medium">
                  Behavioral Training
                </Text>
                <Text className="text-secondary-600 text-sm">
                  Address common behaviors
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#94a3b8"
              />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4 bg-secondary-50 rounded-lg">
              <MaterialCommunityIcons
                name="shield-check"
                size={24}
                color="#fb8500"
              />
              <View className="ml-4 flex-1">
                <Text className="text-secondary-900 font-medium">
                  Safety Training
                </Text>
                <Text className="text-secondary-600 text-sm">
                  Keep your pet safe
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#94a3b8"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Log Activity */}
        <View className="bg-white rounded-xl p-6 shadow-sm">
          <Text className="text-lg font-semibold text-secondary-900 mb-4">
            Log Activity
          </Text>
          <TouchableOpacity className="bg-primary-50 px-4 py-3 rounded-lg">
            <Text className="text-primary-600 font-medium text-center">
              Record Training Activity
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


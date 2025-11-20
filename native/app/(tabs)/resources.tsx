import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ResourcesScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err)
    );
  };

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
            Resources
          </Text>
          <Text className="text-secondary-600">
            Knowledge base and community support
          </Text>
        </View>

        {/* Household Safety Guides */}
        <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-secondary-900 mb-4">
            Household Safety Guides
          </Text>
          <View>
            <TouchableOpacity className="flex-row items-center p-4 bg-secondary-50 rounded-lg mb-3">
              <MaterialCommunityIcons
                name="shield-home"
                size={24}
                color="#fb8500"
              />
              <View className="ml-4 flex-1">
                <Text className="text-secondary-900 font-medium">
                  Home Safety Checklist
                </Text>
                <Text className="text-secondary-600 text-sm">
                  Keep your home pet-safe
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
                name="alert-circle"
                size={24}
                color="#fb8500"
              />
              <View className="ml-4 flex-1">
                <Text className="text-secondary-900 font-medium">
                  Emergency Preparedness
                </Text>
                <Text className="text-secondary-600 text-sm">
                  Be ready for emergencies
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

        {/* Community Links */}
        <View className="bg-white rounded-xl p-6 shadow-sm">
          <Text className="text-lg font-semibold text-secondary-900 mb-4">
            Community
          </Text>
          <TouchableOpacity
            className="flex-row items-center p-4 bg-secondary-50 rounded-lg mb-3"
            onPress={() => openLink('https://youtube.com')}
          >
            <MaterialCommunityIcons
              name="youtube"
              size={24}
              color="#fb0000"
            />
            <View className="ml-4 flex-1">
              <Text className="text-secondary-900 font-medium">YouTube</Text>
              <Text className="text-secondary-600 text-sm">
                Watch tutorials and guides
              </Text>
            </View>
            <MaterialCommunityIcons
              name="open-in-new"
              size={20}
              color="#94a3b8"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center p-4 bg-secondary-50 rounded-lg"
            onPress={() => openLink('https://discord.com')}
          >
            <MaterialCommunityIcons
              name="chat"
              size={24}
              color="#5865f2"
            />
            <View className="ml-4 flex-1">
              <Text className="text-secondary-900 font-medium">Discord</Text>
              <Text className="text-secondary-600 text-sm">
                Join the community
              </Text>
            </View>
            <MaterialCommunityIcons
              name="open-in-new"
              size={20}
              color="#94a3b8"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/use-auth';

export default function ProfileScreen() {
  const { user, logoutAsync } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await logoutAsync(undefined);
              router.replace('/(auth)/login');
            } catch (error) {
              console.error('Logout failed:', error);
            }
          },
        },
      ]
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
        <View className="mb-6 items-center">
          <View className="w-24 h-24 bg-primary-500 rounded-full items-center justify-center mb-4">
             {user?.avatar ? (
                // TODO: Use Image component
                <MaterialCommunityIcons name="account" size={48} color="#ffffff" />
             ) : (
                <MaterialCommunityIcons
                  name="account"
                  size={48}
                  color="#ffffff"
                />
             )}
          </View>
          <Text className="text-2xl font-bold text-secondary-900 mb-1">
            {user?.firstName} {user?.lastName}
          </Text>
          <Text className="text-secondary-600">{user?.email}</Text>
        </View>

        {/* App Settings */}
        <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-secondary-900 mb-4">
            App Settings
          </Text>
          <View className="space-y-3">
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-secondary-100">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="bell"
                  size={24}
                  color="#64748b"
                />
                <Text className="ml-3 text-secondary-900">Notifications</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#94a3b8"
              />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-secondary-100">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="palette"
                  size={24}
                  color="#64748b"
                />
                <Text className="ml-3 text-secondary-900">Theme</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#94a3b8"
              />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="translate"
                  size={24}
                  color="#64748b"
                />
                <Text className="ml-3 text-secondary-900">Language</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#94a3b8"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Subscription Management */}
        <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-secondary-900 mb-4">
            Subscription
          </Text>
          <TouchableOpacity className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="credit-card"
                size={24}
                color="#64748b"
              />
              <Text className="ml-3 text-secondary-900">
                Manage Subscription
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#94a3b8"
            />
          </TouchableOpacity>
        </View>

        {/* Account Details */}
        <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-secondary-900 mb-4">
            Account
          </Text>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-secondary-100">
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="account-edit"
                size={24}
                color="#64748b"
              />
              <Text className="ml-3 text-secondary-900">Edit Profile</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#94a3b8"
            />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-secondary-100">
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="lock"
                size={24}
                color="#64748b"
              />
              <Text className="ml-3 text-secondary-900">Change Password</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#94a3b8"
            />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="shield-lock"
                size={24}
                color="#64748b"
              />
              <Text className="ml-3 text-secondary-900">Privacy Settings</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#94a3b8"
            />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity
          className="bg-red-50 rounded-xl p-4 mb-6"
          onPress={handleLogout}
        >
          <Text className="text-red-600 font-semibold text-center">
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}


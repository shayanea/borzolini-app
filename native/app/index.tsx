import { Redirect } from 'expo-router';
import { View, Text } from 'react-native';
import { useAuth } from '@/hooks/use-auth';

export default function Index() {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  // TODO: Check if user has completed introduction using user.isFirstTime or similar
  const isFirstTime = user?.isFirstTime ?? false;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-secondary-700">Loading...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  if (isFirstTime) {
    return <Redirect href="/introduction" />;
  }

  return <Redirect href="/(tabs)/home" />;
}


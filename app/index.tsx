import { Text, View } from 'react-native';

import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'expo-router';

export default function Index() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-secondary-700">Loading...</Text>
      </View>
    );
  }

  // if (!isFirstTime && !isAuthenticated) {
  //   return <Redirect href="/(auth)/login" />;
  // }

  // if (isFirstTime) {
  return <Redirect href="/introduction" />;
  // }

  return <Redirect href="/(tabs)/home" />;
}

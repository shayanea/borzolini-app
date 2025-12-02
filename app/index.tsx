import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#17171c]">
        <ActivityIndicator size="large" color="#9c5cf6" />
      </View>
    );
  }

  // Redirect based on authentication status
  if (isAuthenticated) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/introduction" />;
}

import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { httpClient } from '@/services/http-client';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      // We don't have a specific hook for this in useAuth yet, using httpClient directly or adding it to auth service would be better
      // For now, let's assume we add useForgotPassword to auth service later, or use direct call
      await httpClient.post('/auth/forgot-password', { email });
      Alert.alert(
        'Success',
        'If an account exists with this email, you will receive a password reset link.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send reset email';
      Alert.alert('Error', message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-6 py-12"
      >
        <View className="mb-8">
          <Text className="text-3xl font-bold text-secondary-900 mb-2">
            Reset Password
          </Text>
          <Text className="text-secondary-600">
            Enter your email address and we'll send you a link to reset your
            password
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium text-secondary-700 mb-2">
            Email
          </Text>
          <TextInput
            className="w-full px-4 py-3 border border-secondary-300 rounded-lg text-secondary-900 bg-white"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>

        <TouchableOpacity
          className="w-full bg-primary-500 py-4 rounded-lg mb-4"
          onPress={handleReset}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-semibold text-base">
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Text>
        </TouchableOpacity>

        <Link href="/(auth)/login" asChild>
          <TouchableOpacity>
            <Text className="text-primary-600 text-center text-sm">
              Back to Sign In
            </Text>
          </TouchableOpacity>
        </Link>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


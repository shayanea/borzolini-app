import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/use-auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAsync, isLoggingIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      await loginAsync({ email, password });
      router.replace('/(tabs)/home');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      Alert.alert('Login Error', message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow"
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 py-12">
            <View className="mb-8">
              <Text className="text-3xl font-bold text-secondary-900 mb-2">
                Welcome Back
              </Text>
              <Text className="text-secondary-600">
                Sign in to continue to your pet's health
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

            <View className="mb-6">
              <Text className="text-sm font-medium text-secondary-700 mb-2">
                Password
              </Text>
              <TextInput
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg text-secondary-900 bg-white"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              className="w-full bg-primary-500 py-4 rounded-lg mb-4"
              onPress={handleLogin}
              disabled={isLoggingIn}
            >
              <Text className="text-white text-center font-semibold text-base">
                {isLoggingIn ? 'Signing in...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            <Link href="/(auth)/forgot-password" asChild>
              <TouchableOpacity>
                <Text className="text-primary-600 text-center text-sm">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </Link>

            <View className="mt-8 flex-row justify-center items-center">
              <Text className="text-secondary-600">Don't have an account? </Text>
              <Link href="/(auth)/register" asChild>
                <TouchableOpacity>
                  <Text className="text-primary-600 font-semibold">Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


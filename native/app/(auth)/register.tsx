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

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { registerAsync, isRegistering } = useAuth();

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await registerAsync({
        email,
        password,
        firstName,
        lastName,
      });
      router.replace('/introduction');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      Alert.alert('Registration Error', message);
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
                Create Account
              </Text>
              <Text className="text-secondary-600">
                Sign up to start managing your pet's health
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-secondary-700 mb-2">
                First Name
              </Text>
              <TextInput
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg text-secondary-900 bg-white"
                placeholder="Enter your first name"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-secondary-700 mb-2">
                Last Name
              </Text>
              <TextInput
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg text-secondary-900 bg-white"
                placeholder="Enter your last name"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
              />
            </View>

            <View className="mb-4">
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

            <View className="mb-4">
              <Text className="text-sm font-medium text-secondary-700 mb-2">
                Password
              </Text>
              <TextInput
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg text-secondary-900 bg-white"
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View className="mb-6">
              <Text className="text-sm font-medium text-secondary-700 mb-2">
                Confirm Password
              </Text>
              <TextInput
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg text-secondary-900 bg-white"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              className="w-full bg-primary-500 py-4 rounded-lg mb-4"
              onPress={handleRegister}
              disabled={isRegistering}
            >
              <Text className="text-white text-center font-semibold text-base">
                {isRegistering ? 'Creating account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            <View className="mt-4 flex-row justify-center items-center">
              <Text className="text-secondary-600">Already have an account? </Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text className="text-primary-600 font-semibold">Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


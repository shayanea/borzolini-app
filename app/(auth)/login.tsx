import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useLogin } from '@/features/auth/hooks/use-login';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    handleLogin,
    isLoggingIn,
  } = useLogin();

  return (
    <View className="flex-1 bg-[#17171c]">
      <SafeAreaView className="flex-1 justify-center px-4">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-center"
        >
          <ScrollView
            contentContainerClassName="flex-grow justify-center"
            keyboardShouldPersistTaps="handled"
          >
            <View className="bg-[#1f1f24] rounded-3xl p-8 shadow-xl mx-2">
              <Text className="text-3xl font-bold text-center text-primary mb-8 leading-tight">
                Hello,{'\n'}
                <Text className="text-white">Welcome Back</Text>
              </Text>

              <View className="mb-8">
                <Text className="text-xs font-bold text-secondary-400 uppercase mb-2 tracking-wider">
                  E-Mail
                </Text>
                <TextInput
                  className="w-full px-4 py-3.5 border border-secondary-700 rounded-xl text-white bg-secondary-800 text-base"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  placeholderTextColor="#64748b"
                />
              </View>

              <View className="mb-4">
                <Text className="text-xs font-bold text-secondary-400 uppercase mb-2 tracking-wider">
                  Password
                </Text>
                <View className="relative">
                  <TextInput
                    className="w-full px-4 py-3.5 border border-secondary-700 rounded-xl text-white bg-secondary-800 text-base pr-12"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    placeholderTextColor="#64748b"
                  />
                  <TouchableOpacity
                    className="absolute right-4 top-3.5"
                    onPress={togglePasswordVisibility}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={22}
                      color="#94a3b8"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <Link href="/(auth)/forgot-password" asChild>
                <TouchableOpacity className="self-end mb-8">
                  <Text className="text-primary text-sm font-semibold">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </Link>

              <TouchableOpacity
                className="w-full bg-primary py-4 rounded-full mb-8 shadow-lg shadow-primary/30 active:opacity-90"
                onPress={handleLogin}
                disabled={isLoggingIn}
              >
                <Text className="text-white text-center font-bold text-base uppercase tracking-wide">
                  {isLoggingIn ? 'Logging in...' : 'Log In'}
                </Text>
              </TouchableOpacity>

              <View className="flex-row items-center mb-8">
                <View className="flex-1 h-[1px] bg-secondary-700" />
                <Text className="mx-4 text-xs text-secondary-500 font-bold tracking-widest">
                  OR LOGIN WITH
                </Text>
                <View className="flex-1 h-[1px] bg-secondary-700" />
              </View>

              <View className="flex-row justify-center mb-8">
                <TouchableOpacity className="w-14 h-14 bg-secondary-800 border border-secondary-700 rounded-full items-center justify-center shadow-sm active:bg-secondary-700">
                  <Ionicons name="logo-google" size={26} color="#94a3b8" />
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-center items-center">
                <Text className="text-secondary-400 text-sm font-medium">
                  New to Borzolini?{' '}
                </Text>
                <Link href="/(auth)/register" asChild>
                  <TouchableOpacity>
                    <Text className="text-primary font-bold text-sm">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

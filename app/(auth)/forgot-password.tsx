import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { AuthField } from '@/features/auth/components/auth-field';
import { useForgotPasswordForm } from '@/features/auth/hooks/use-forgot-password';

export default function ForgotPasswordScreen() {
  const { email, setEmail, handleSubmit, isSubmitting } =
    useForgotPasswordForm();

  return (
    <View className="flex-1 bg-slate-100">
      <SafeAreaView className="flex-1 justify-center px-4">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-center"
        >
          <ScrollView
            contentContainerClassName="flex-grow justify-center"
            keyboardShouldPersistTaps="handled"
          >
            <View className="bg-white rounded-3xl p-8 shadow-xl mx-2">
              <Text className="text-3xl font-bold text-center text-blue-500 mb-2 leading-tight">
                Forgot Password?
              </Text>
              <Text className="text-center text-secondary-500 text-base mb-8">
                Enter your email address and we&apos;ll send you a link to reset
                your password.
              </Text>

              <AuthField
                label="E-Mail"
                required
                placeholder="Enter your email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <TouchableOpacity
                className="w-full bg-orange-500 py-4 rounded-full mb-6 shadow-lg shadow-orange-500/30 active:bg-orange-600"
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <Text className="text-white text-center font-bold text-base uppercase tracking-wide">
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </Text>
              </TouchableOpacity>

              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text className="text-blue-500 text-center font-bold text-sm">
                    Back to Login
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}


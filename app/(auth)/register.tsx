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
import { Ionicons } from '@expo/vector-icons';
import { AuthField } from '@/features/auth/components/auth-field';
import { useRegisterForm } from '@/features/auth/hooks/use-register';

export default function RegisterScreen() {
  const {
    values,
    updateField,
    handleRegister,
    isRegistering,
    showPassword,
    togglePasswordVisibility,
  } = useRegisterForm();

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
              <Text className="text-3xl font-bold text-center text-blue-400 mb-2 leading-tight">
                Sign Up
              </Text>
              <Text className="text-center text-secondary-400 text-base mb-8">
                Sign up to access your healthcare services and manage
                appointments
              </Text>

              <AuthField
                label="First Name"
                placeholder="Enter your first name"
                value={values.firstName}
                onChangeText={text => updateField('firstName', text)}
                autoCapitalize="words"
              />

              <AuthField
                label="Last Name"
                placeholder="Enter your last name"
                value={values.lastName}
                onChangeText={text => updateField('lastName', text)}
                autoCapitalize="words"
              />

              <AuthField
                label="Phone"
                placeholder="Enter your phone number"
                value={values.phone}
                onChangeText={text => updateField('phone', text)}
                keyboardType="phone-pad"
              />

              <AuthField
                label="E-Mail"
                placeholder="Enter email address"
                value={values.email}
                onChangeText={text => updateField('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <AuthField
                label="Password"
                placeholder="Enter password"
                value={values.password}
                onChangeText={text => updateField('password', text)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                renderRight={() => (
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    accessibilityRole="button"
                    accessibilityLabel={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={22}
                      color="#64748b"
                    />
                  </TouchableOpacity>
                )}
              />

              <TouchableOpacity
                className="w-full bg-orange-500 py-4 rounded-full mb-6 shadow-lg shadow-orange-500/30 active:bg-orange-600"
                onPress={handleRegister}
                disabled={isRegistering}
              >
                <Text className="text-white text-center font-bold text-base uppercase tracking-wide">
                  {isRegistering ? 'Creating account...' : 'Sign Up'}
                </Text>
              </TouchableOpacity>

              <View className="flex-row justify-center items-center">
                <Text className="text-secondary-400 text-sm font-medium">
                  Already have an account?{' '}
                </Text>
                <Link href="/(auth)/login" asChild>
                  <TouchableOpacity>
                    <Text className="text-blue-400 font-bold text-sm">Log In</Text>
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


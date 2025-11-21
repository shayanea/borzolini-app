import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useForgotPassword } from '@/services/auth';
import { EMAIL_REGEX } from '@/features/auth/utils/patterns';

export const useForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>('');
  const { mutateAsync, isPending } = useForgotPassword();

  const handleSubmit = async () => {
    if (!EMAIL_REGEX.test(email.trim())) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    try {
      await mutateAsync({ email: email.trim() });
      Alert.alert(
        'Check Your Inbox',
        'If this email is registered, you will receive a password reset link shortly.',
        [{ text: 'OK', onPress: () => router.replace('/(auth)/login') }]
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to send reset email';
      Alert.alert('Password Reset Error', message);
    }
  };

  return {
    email,
    setEmail,
    handleSubmit,
    isSubmitting: isPending,
  };
};



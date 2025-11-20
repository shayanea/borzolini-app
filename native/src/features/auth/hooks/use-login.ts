import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/use-auth';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    handleLogin,
    isLoggingIn,
  };
};


import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/use-auth';
import { EMAIL_REGEX, PHONE_REGEX } from '@/features/auth/utils/patterns';

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

const INITIAL_VALUES: RegisterFormValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
};

export const useRegisterForm = () => {
  const [values, setValues] = useState<RegisterFormValues>(INITIAL_VALUES);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { registerAsync, isRegistering } = useAuth();

  const updateField = <T extends keyof RegisterFormValues>(
    field: T,
    value: RegisterFormValues[T]
  ) => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!values.firstName.trim() || !values.lastName.trim()) {
      Alert.alert('Missing Information', 'Please enter your full name.');
      return false;
    }

    if (!EMAIL_REGEX.test(values.email.trim())) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }

    if (values.phone && !PHONE_REGEX.test(values.phone.trim())) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number.');
      return false;
    }

    if (values.password.length < 8) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 8 characters long.'
      );
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await registerAsync({
        email: values.email.trim(),
        password: values.password,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        phone: values.phone.trim(),
      });
      router.replace('/introduction');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Registration failed';
      Alert.alert('Registration Error', message);
    }
  };

  return {
    values,
    updateField,
    handleRegister,
    isRegistering,
    showPassword,
    togglePasswordVisibility: () => setShowPassword(prev => !prev),
  };
};



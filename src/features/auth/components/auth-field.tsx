import { ReactNode } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

export interface AuthFieldProps extends TextInputProps {
  label: string;
  containerClassName?: string;
  inputClassName?: string;
  renderRight?: () => ReactNode;
  required?: boolean;
}

export function AuthField({
  label,
  containerClassName,
  inputClassName,
  renderRight,
  required = false,
  placeholderTextColor,
  ...textInputProps
}: AuthFieldProps) {
  const containerClasses = ['mb-4', containerClassName]
    .filter(Boolean)
    .join(' ')
    .trim();

  const inputClasses = [
    'w-full px-4 py-3.5 border border-secondary-200 rounded-xl text-secondary-900 bg-white text-base',
    inputClassName,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  return (
    <View className={containerClasses}>
      {label ? (
        <View className="flex-row items-center mb-2 gap-1">
          <Text className="text-xs font-bold text-secondary-500 uppercase tracking-wider">
            {label}
          </Text>
          {required ? (
            <Text className="text-xs font-bold text-orange-500">*</Text>
          ) : null}
        </View>
      ) : null}
      <View className="relative">
        <TextInput
          className={inputClasses}
          placeholderTextColor={placeholderTextColor ?? '#94a3b8'}
          {...textInputProps}
        />
        {renderRight ? (
          <View className="absolute right-4 top-0 bottom-0 justify-center">
            {renderRight()}
          </View>
        ) : null}
      </View>
    </View>
  );
}



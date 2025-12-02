import React from 'react';
import { Image, Text, View, type ImageSourcePropType } from 'react-native';
import { appTheme } from '@/constants/theme';
import { styles } from './bottom-tab-bar.styles';

interface TabBarIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  label: string;
}

export function TabBarIcon({ focused, icon, label }: TabBarIconProps) {
  const iconColor = focused ? appTheme.colors.primary : appTheme.colors.textSecondary;
  const textColor = focused ? appTheme.colors.primary : appTheme.colors.textSecondary;

  return (
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        style={[
          styles.icon,
          focused ? styles.iconFocused : styles.iconUnfocused,
          { tintColor: iconColor },
        ]}
        resizeMode="contain"
      />
      <Text style={[styles.label, { color: textColor }]}>
        {label}
      </Text>
    </View>
  );
}


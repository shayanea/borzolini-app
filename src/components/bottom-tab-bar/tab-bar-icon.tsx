import React from 'react';
import { Image, type ImageSourcePropType } from 'react-native';

export interface TabBarIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  color?: string;
  size?: number;
}

export function TabBarIcon({ icon, color, size = 24 }: TabBarIconProps) {
  return (
    <Image
      source={icon}
      style={{
        width: size,
        height: size,
        tintColor: color,
      }}
      resizeMode="contain"
    />
  );
}

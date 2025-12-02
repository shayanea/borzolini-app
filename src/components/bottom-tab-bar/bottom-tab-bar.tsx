import { Text, TouchableOpacity, View } from 'react-native';

import React from 'react';
import type { Tabs } from 'expo-router';
import { appTheme } from '@/constants/theme';

type TabsTabBarProps = Parameters<
  NonNullable<React.ComponentProps<typeof Tabs>['tabBar']>
>[0];

interface BottomTabBarProps {
  state: TabsTabBarProps['state'];
  descriptors: TabsTabBarProps['descriptors'];
  navigation: TabsTabBarProps['navigation'];
}

export function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-[#17171c] border-t border-white/5 pb-5 pt-2 px-4">
      <View className="flex-row items-center justify-between">
        {state.routes.map(
          (
            route: TabsTabBarProps['state']['routes'][number],
            index: number
          ) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            const isMiddle = index === 2; // Assuming 5 tabs, index 2 is the middle one
            console.log(options);

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            // Special rendering for the middle "Scan" button
            if (isMiddle) {
              return (
                <TouchableOpacity
                  key={index}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  className="items-center justify-center -mt-14"
                  activeOpacity={0.8}
                >
                  <View className="w-16 h-16 rounded-full bg-[#9c5cf6] items-center justify-center shadow-lg shadow-[#9c5cf6]/30 border-4 border-[#17171c]">
                    {options.tabBarIcon?.({
                      focused: isFocused,
                      color: '#ffffff',
                      size: 28,
                    })}
                  </View>
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
                onLongPress={onLongPress}
                className="items-center justify-center py-2 px-4 bg-white"
                activeOpacity={0.7}
              >
                {options.tabBarIcon?.({
                  focused: isFocused,
                  color: isFocused ? appTheme.colors.primary : '#94a3b8',
                  size: 24,
                })}
                <Text
                  className={`text-[10px] font-medium mt-1 ${isFocused ? 'text-primary' : 'text-white'}`}
                >
                  {options.title}
                </Text>
              </TouchableOpacity>
            );
          }
        )}
      </View>
    </View>
  );
}

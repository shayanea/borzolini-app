import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { BlurView } from 'expo-blur';
import type { Tabs } from 'expo-router';
import { appTheme } from '@/constants/theme';
import { styles } from './bottom-tab-bar.styles';

type TabsTabBarProps = Parameters<
  NonNullable<React.ComponentProps<typeof Tabs>['tabBar']>
>[0];

interface BottomTabBarProps {
  state: TabsTabBarProps['state'];
  descriptors: TabsTabBarProps['descriptors'];
  navigation: TabsTabBarProps['navigation'];
}

export function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const renderContent = () => (
    <View style={styles.tabBarContent}>
      {state.routes.map(
        (route: TabsTabBarProps['state']['routes'][number], index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

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

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
            >
              {options.tabBarIcon?.({
                focused: isFocused,
                color: isFocused ? appTheme.colors.primary : appTheme.colors.textSecondary,
                size: appTheme.spacing.iconSize,
              })}
            </TouchableOpacity>
          );
        }
      )}
    </View>
  );

  return (
    <View style={styles.tabBar}>
      {Platform.OS === 'ios' ? (
        <BlurView intensity={20} tint="dark" style={styles.tabBarInner}>
          {renderContent()}
        </BlurView>
      ) : (
        <View style={styles.tabBarInner}>
          {renderContent()}
        </View>
      )}
    </View>
  );
}


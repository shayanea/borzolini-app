import {
  Alert,
  Animated,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'expo-router';

export interface SidebarMenuProps {
  visible: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  route?: string;
  showSoonBadge?: boolean;
  isLogout?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    icon: 'account',
    route: '/profile',
  },
  {
    id: 'name-generator',
    label: 'Name Generator',
    icon: 'alphabetical-variant',
    route: '/name-generator',
  },
  {
    id: 'pet-matching',
    label: 'Pet Matching',
    icon: 'heart-multiple',
    showSoonBadge: true,
  },
  {
    id: 'lost-pets',
    label: 'Lost Pets',
    icon: 'map-search',
    showSoonBadge: true,
  },
];

export function SidebarMenu({ visible, onClose }: SidebarMenuProps) {
  const { user, logoutAsync } = useAuth();
  const router = useRouter();
  const [slideAnim] = useState(() => new Animated.Value(-300));

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleMenuItemPress = (item: MenuItem) => {
    if (item.isLogout) {
      handleLogout();
      return;
    }

    if (item.showSoonBadge) {
      // Don't navigate if it's a "soon" feature
      return;
    }

    if (item.route) {
      onClose();
      router.push(item.route);
    }
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await logoutAsync(undefined);
            onClose();
            router.replace('/(auth)/login');
          } catch (error) {
            console.error('Logout failed:', error);
          }
        },
      },
    ]);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View className="flex-1 flex-row">
        {/* Sidebar */}
        <Animated.View
          className="w-72 bg-[#17171c] border-r border-white/10"
          style={{
            transform: [{ translateX: slideAnim }],
          }}
        >
          <View className="flex-1">
            {/* Header */}
            <View className="px-6 pt-16 pb-6 border-b border-white/5">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-white text-2xl font-bold">Menu</Text>
                <TouchableOpacity
                  onPress={onClose}
                  className="w-8 h-8 rounded-full bg-[#2a2a30] items-center justify-center"
                >
                  <MaterialCommunityIcons name="close" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
              {user && (
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-primary items-center justify-center mr-3">
                    {user.avatar ? (
                      <MaterialCommunityIcons
                        name="account"
                        size={24}
                        color="#ffffff"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account"
                        size={24}
                        color="#ffffff"
                      />
                    )}
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-semibold text-base">
                      {user.firstName} {user.lastName}
                    </Text>
                    <Text className="text-gray-400 text-sm" numberOfLines={1}>
                      {user.email}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Menu Items */}
            <View className="flex-1 px-4 pt-4">
              {menuItems.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleMenuItemPress(item)}
                  className={`flex-row items-center py-4 px-4 rounded-xl mb-2 ${
                    item.showSoonBadge ? 'opacity-60' : ''
                  }`}
                  activeOpacity={0.7}
                  disabled={item.showSoonBadge}
                >
                  <View className="w-10 h-10 rounded-full bg-[#2a2a30] items-center justify-center mr-3">
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={22}
                      color={item.showSoonBadge ? '#64748b' : '#9c5cf6'}
                    />
                  </View>
                  <View className="flex-1 flex-row items-center">
                    <Text
                      className={`text-base ${
                        item.showSoonBadge ? 'text-gray-400' : 'text-white'
                      }`}
                    >
                      {item.label}
                    </Text>
                    {item.showSoonBadge && (
                      <View className="ml-2 px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30">
                        <Text className="text-orange-500 text-xs font-semibold">
                          Soon
                        </Text>
                      </View>
                    )}
                  </View>
                  {!item.showSoonBadge && (
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={20}
                      color="#64748b"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Footer */}
            <View className="px-4 pb-6 border-t border-white/5 pt-4">
              {/* Logout Button */}
              <TouchableOpacity
                onPress={handleLogout}
                className="flex-row items-center py-4 px-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-4"
                activeOpacity={0.7}
              >
                <View className="w-10 h-10 rounded-full bg-red-500/20 items-center justify-center mr-3">
                  <MaterialCommunityIcons
                    name="logout"
                    size={22}
                    color="#ef4444"
                  />
                </View>
                <Text className="text-red-500 font-semibold text-base flex-1">
                  Logout
                </Text>
              </TouchableOpacity>

              {/* Version */}
              <View className="items-center">
                <Text className="text-gray-500 text-xs">Version 1.0.0</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Backdrop */}
        <TouchableOpacity
          className="flex-1 bg-black/50"
          activeOpacity={1}
          onPress={onClose}
        />
      </View>
    </Modal>
  );
}

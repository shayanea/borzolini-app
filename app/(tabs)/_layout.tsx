import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import type { ViewStyle } from 'react-native';
import { TouchableOpacity, View } from 'react-native';

const ORANGE_PRIMARY = '#fb8500';
const SLATE_50 = '#f8fafc';

const customButtonStyle: ViewStyle = {
  top: -20,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: ORANGE_PRIMARY,
  shadowOffset: {
    width: 0,
    height: 8,
  },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 10,
};

const customButtonInnerStyle: ViewStyle = {
  width: 64,
  height: 64,
  borderRadius: 32,
  backgroundColor: ORANGE_PRIMARY,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 4,
  borderColor: SLATE_50,
};

interface CustomTabBarButtonProps {
  children: React.ReactNode;
  onPress?: (e: Parameters<NonNullable<ComponentProps<typeof TouchableOpacity>['onPress']>>[0]) => void;
}

function CustomTabBarButton(props: CustomTabBarButtonProps) {
  const { children, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={customButtonStyle}>
      <View style={customButtonInnerStyle}>{children}</View>
    </TouchableOpacity>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 24,
          left: 24,
          right: 24,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 32,
          height: 72,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          paddingBottom: 0, // Reset default padding
        },
        tabBarItemStyle: {
          height: 72,
          paddingTop: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={26}
              color={focused ? '#fb8500' : '#94a3b8'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pets"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={26}
              color={focused ? '#fb8500' : '#94a3b8'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
              <MaterialCommunityIcons
                name="calendar-plus"
                size={32}
                color="#ffffff"
              />
            </CustomTabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'hospital-building' : 'hospital-building'}
              size={26}
              color={focused ? '#fb8500' : '#94a3b8'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={26}
              color={focused ? '#fb8500' : '#94a3b8'}
            />
          ),
        }}
      />
    </Tabs>
  );
}


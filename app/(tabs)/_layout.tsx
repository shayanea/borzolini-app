import { BottomTabBar, TabBarIcon } from '@/components/bottom-tab-bar';

import { appTheme } from '@/constants/theme';
import { Tabs } from 'expo-router';
import clinicsIcon from '../../assets/icons/clinics.png';
import houseIcon from '../../assets/icons/house.png';
import petsIcon from '../../assets/icons/pets.png';
import resourcesIcon from '../../assets/icons/resources.png';
import trainingIcon from '../../assets/icons/training.png';

type TabKey = 'home' | 'pets' | 'training' | 'resources' | 'profile';

const TAB_ICONS: Record<TabKey, number> = {
  home: houseIcon,
  pets: petsIcon,
  training: trainingIcon,
  resources: resourcesIcon,
  profile: clinicsIcon,
};

const TAB_LABELS: Record<TabKey, string> = {
  home: 'Home',
  pets: 'Pets',
  training: 'Training',
  resources: 'Resources',
  profile: 'Profile',
};

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: appTheme.colors.primary,
        tabBarInactiveTintColor: appTheme.colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={TAB_ICONS.home}
              label={TAB_LABELS.home}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pets"
        options={{
          title: 'Pets',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={TAB_ICONS.pets}
              label={TAB_LABELS.pets}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: 'Training',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={TAB_ICONS.training}
              label={TAB_LABELS.training}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Resources',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={TAB_ICONS.resources}
              label={TAB_LABELS.resources}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={TAB_ICONS.profile}
              label={TAB_LABELS.profile}
            />
          ),
        }}
      />
    </Tabs>
  );
}

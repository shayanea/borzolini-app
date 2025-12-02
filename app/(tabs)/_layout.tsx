import { BottomTabBar, TabBarIcon } from '@/components/bottom-tab-bar';

import { Tabs } from 'expo-router';
import houseIcon from '../../assets/icons/house.png';
import petsIcon from '../../assets/icons/pets.png';
import resourcesIcon from '../../assets/icons/resources.png';
import scanIcon from '../../assets/icons/scan.png';
import trainingIcon from '../../assets/icons/training.png';

type TabKey = 'home' | 'pets' | 'scan' | 'training' | 'resources';

const TAB_ICONS: Record<TabKey, number> = {
  home: houseIcon,
  pets: petsIcon,
  scan: scanIcon,
  training: trainingIcon,
  resources: resourcesIcon,
};

const TAB_LABELS: Record<TabKey, string> = {
  home: 'Home',
  pets: 'Pets',
  scan: 'AI Scan',
  training: 'Training',
  resources: 'Resources',
};

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: TAB_LABELS.home,
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              focused={focused}
              icon={TAB_ICONS.home}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pets"
        options={{
          title: TAB_LABELS.pets,
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              focused={focused}
              icon={TAB_ICONS.pets}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: TAB_LABELS.scan,
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              focused={focused}
              icon={TAB_ICONS.scan}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: TAB_LABELS.training,
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              focused={focused}
              icon={TAB_ICONS.training}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: TAB_LABELS.resources,
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              focused={focused}
              icon={TAB_ICONS.resources}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

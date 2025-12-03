import { Text, TouchableOpacity, View } from 'react-native';

export type TabKey = 'overview' | 'stats' | 'health';

export interface Tab {
  key: TabKey;
  title: string;
}

interface BreedDetailTabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const tabs: Tab[] = [
  { key: 'overview', title: 'Overview' },
  { key: 'stats', title: 'Stats' },
  { key: 'health', title: 'Health' },
];

export function BreedDetailTabs({ activeTab, onTabChange }: BreedDetailTabsProps) {
  return (
    <View className="flex-row border-b border-white/5 px-6">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onTabChange(tab.key)}
            className="flex-1 items-center py-4"
          >
            <Text 
              className={`text-base font-medium ${
                isActive ? 'text-white' : 'text-white/40'
              }`}
            >
              {tab.title}
            </Text>
            {isActive && (
              <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9c5cf6]" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

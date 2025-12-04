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
    <View className="flex-row bg-[#232328] rounded-full mx-6 p-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onTabChange(tab.key)}
            className={`flex-1 items-center py-3 rounded-full ${
              isActive ? 'bg-[#17171c]' : ''
            }`}
          >
            <Text 
              className={`text-sm font-medium ${
                isActive ? 'text-white' : 'text-white/40'
              }`}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

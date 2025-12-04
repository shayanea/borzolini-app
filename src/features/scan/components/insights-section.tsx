import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AIInsight } from '../types';
import { InsightCard } from './insight-card';

type TabType = 'insights' | 'trends';

interface InsightsSectionProps {
  insights: AIInsight[];
}

export function InsightsSection({ insights }: InsightsSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('insights');

  return (
    <View className="mb-6">
      {/* Tab Bar */}
      <View className="flex-row border-b border-white/10 mb-4">
        <TouchableOpacity
          className={`flex-1 pb-3 ${activeTab === 'insights' ? 'border-b-2 border-purple-500' : ''}`}
          onPress={() => setActiveTab('insights')}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === 'insights' ? 'text-white' : 'text-gray-500'
            }`}
          >
            AI Insights
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 pb-3 ${activeTab === 'trends' ? 'border-b-2 border-purple-500' : ''}`}
          onPress={() => setActiveTab('trends')}
        >
          <Text
            className={`text-center font-semibold ${
              activeTab === 'trends' ? 'text-white' : 'text-gray-500'
            }`}
          >
            Trends
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'insights' ? (
        <View>
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </View>
      ) : (
        <View className="bg-[#232328] border border-white/10 rounded-2xl p-6 items-center">
          <Text className="text-gray-400 text-center">
            Health trends will appear here after multiple scans.
          </Text>
        </View>
      )}
    </View>
  );
}

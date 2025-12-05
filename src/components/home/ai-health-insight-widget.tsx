import { Image, Text, View } from 'react-native';

import { Card } from '@/components/ui/card';
import aiInsightIcon from '../../../assets/icons/ai-insight.png';

export function AiHealthInsightWidget() {
  return (
    <View className="my-6">
      {/* Header */}
      <View className="flex-row items-center mb-3">
        <Image
          source={aiInsightIcon}
          className="w-5 h-5 mr-2"
          resizeMode="contain"
          style={{ tintColor: '#c084fc' }}
        />
        <Text className="text-white font-bold text-lg">AI Health Insight</Text>
      </View>

      {/* Card */}
      <Card className="flex-row items-start p-5">
        {/* Icon Circle */}
        <View className="w-12 h-12 rounded-2xl bg-[#2d2638] items-center justify-center mr-4 mt-1">
          <Image
            source={aiInsightIcon}
            className="w-7 h-7"
            resizeMode="contain"
            style={{ tintColor: '#c084fc' }}
          />
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text className="text-[#e9d5ff] font-bold text-base mb-2">
            Activity Analysis
          </Text>
          <Text className="text-gray-400 leading-5 text-sm">
            Based on Bailey's recent activity patterns, he seems slightly less
            active in the mornings. Consider shifting the morning walk 30 mins
            later to align with his peak energy levels.
          </Text>
        </View>
      </Card>
    </View>
  );
}

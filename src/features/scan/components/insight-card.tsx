import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { AIInsight, InsightStatus } from '../types';

interface InsightCardProps {
  insight: AIInsight;
}

const statusConfig: Record<InsightStatus, { icon: keyof typeof Ionicons.glyphMap; color: string; bgColor: string }> = {
  good: { icon: 'checkmark-circle', color: '#10b981', bgColor: 'bg-emerald-500/20' },
  normal: { icon: 'checkmark-circle', color: '#10b981', bgColor: 'bg-emerald-500/20' },
  warning: { icon: 'alert-circle', color: '#f59e0b', bgColor: 'bg-amber-500/20' },
  critical: { icon: 'close-circle', color: '#ef4444', bgColor: 'bg-red-500/20' },
};

export function InsightCard({ insight }: InsightCardProps) {
  const config = statusConfig[insight.status];

  return (
    <View className="bg-[#232328] border border-white/10 rounded-2xl p-4 mb-3">
      <View className="flex-row items-start">
        <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${config.bgColor}`}>
          <Ionicons name={config.icon} size={18} color={config.color} />
        </View>
        <View className="flex-1">
          <Text className="text-white font-semibold mb-1">{insight.title}</Text>
          <Text className="text-gray-400 text-sm leading-5">{insight.description}</Text>
        </View>
      </View>
    </View>
  );
}

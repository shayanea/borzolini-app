import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { RealTimeMetrics as RealTimeMetricsType } from '../types';

interface MetricCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  label: string;
  value: string;
  unit: string;
  status: string;
}

function MetricCard({ icon, iconColor, label, value, unit, status }: MetricCardProps) {
  return (
    <View className="flex-1 bg-[#232328] border border-white/10 rounded-2xl p-4">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <Ionicons name={icon} size={16} color={iconColor} />
          <Text className="text-gray-400 text-xs ml-2">{label}</Text>
        </View>
        <View className="bg-[#2a2a30] px-2 py-1 rounded">
          <Text className="text-gray-400 text-xs">{status}</Text>
        </View>
      </View>
      <View className="flex-row items-baseline">
        <Text className="text-white text-2xl font-bold">{value}</Text>
        <Text className="text-gray-400 text-sm ml-1">{unit}</Text>
      </View>
    </View>
  );
}

interface RealTimeMetricsProps {
  metrics: RealTimeMetricsType;
}

export function RealTimeMetrics({ metrics }: RealTimeMetricsProps) {
  return (
    <View className="mb-6">
      <Text className="text-white font-bold text-lg mb-4">Real-Time Metrics</Text>
      <View className="flex-row gap-3">
        <MetricCard
          icon="heart-outline"
          iconColor="#f472b6"
          label="Heart Rate"
          value={metrics.heartRate.value.toString()}
          unit={metrics.heartRate.unit}
          status={metrics.heartRate.status}
        />
        <MetricCard
          icon="thermometer-outline"
          iconColor="#60a5fa"
          label="Body Temp"
          value={metrics.bodyTemp.value.toString()}
          unit={metrics.bodyTemp.unit}
          status={metrics.bodyTemp.status}
        />
      </View>
    </View>
  );
}

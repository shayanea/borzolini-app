import { Text, View } from 'react-native';

interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: string;
}

export function ProgressBar({ label, percentage, color = '#9c5cf6' }: ProgressBarProps) {
  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-white text-base font-medium">{label}</Text>
        <Text className="text-white/60 text-sm">{percentage}%</Text>
      </View>
      <View className="h-2 bg-white/10 rounded-full overflow-hidden">
        <View 
          style={{ width: `${percentage}%`, backgroundColor: color }} 
          className="h-full rounded-full"
        />
      </View>
    </View>
  );
}

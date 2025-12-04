import { Text, View } from 'react-native';

interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: string;
  isLast?: boolean;
}

export function ProgressBar({ label, percentage, color = '#9c5cf6', isLast = false }: ProgressBarProps) {
  return (
    <View className={isLast ? '' : 'mb-5'}>
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-white text-sm font-medium">{label}</Text>
        <Text className="text-white/40 text-sm">{percentage}%</Text>
      </View>
      <View className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <View 
          style={{ width: `${percentage}%`, backgroundColor: color }} 
          className="h-full rounded-full"
        />
      </View>
    </View>
  );
}

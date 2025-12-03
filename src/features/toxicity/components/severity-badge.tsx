import { Text, View } from 'react-native';
import { ToxicitySeverity } from '../types';

interface SeverityBadgeProps {
  severity: ToxicitySeverity;
}

const severityColors = {
  [ToxicitySeverity.MILD]: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-500',
    border: 'border-yellow-500/30',
  },
  [ToxicitySeverity.MODERATE]: {
    bg: 'bg-orange-500/20',
    text: 'text-orange-500',
    border: 'border-orange-500/30',
  },
  [ToxicitySeverity.SEVERE]: {
    bg: 'bg-red-500/20',
    text: 'text-red-500',
    border: 'border-red-500/30',
  },
  [ToxicitySeverity.FATAL]: {
    bg: 'bg-red-600/20',
    text: 'text-red-600',
    border: 'border-red-600/30',
  },
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const colors = severityColors[severity];

  return (
    <View className={`px-3 py-1 rounded-full border ${colors.bg} ${colors.border}`}>
      <Text className={`text-xs font-semibold ${colors.text}`}>
        {severity}
      </Text>
    </View>
  );
}

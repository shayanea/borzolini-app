import { Text, TouchableOpacity, View } from 'react-native';
import { ToxicityItem, ToxicityType } from '../types';
import { SeverityBadge } from './severity-badge';

interface ToxicityItemCardProps {
  item: ToxicityItem;
  onPress: () => void;
}

export function ToxicityItemCard({ item, onPress }: ToxicityItemCardProps) {
  const iconColor = item.type === ToxicityType.FOOD ? '#ea580c' : '#22c55e';
  const IconComponent = item.type === ToxicityType.FOOD ? '⚠️' : '🌿';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-[#232328] border border-white/10 rounded-2xl p-4 mb-3"
    >
      <View className="flex-row items-start">
        {/* Icon */}
        <View 
          className="w-12 h-12 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: `${iconColor}20` }}
        >
          <Text className="text-2xl">{IconComponent}</Text>
        </View>

        {/* Content */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-white font-bold text-base flex-1">
              {item.name}
            </Text>
            <SeverityBadge severity={item.severity} />
          </View>

          <Text className="text-gray-400 text-sm mb-3" numberOfLines={2}>
            {item.description}
          </Text>

          {/* Symptoms */}
          <View className="flex-row flex-wrap gap-2">
            {item.symptoms.slice(0, 3).map((symptom, index) => (
              <View
                key={index}
                className="px-2 py-1 rounded-md bg-white/5 border border-white/10"
              >
                <Text className="text-gray-400 text-xs">{symptom}</Text>
              </View>
            ))}
            {item.symptoms.length > 3 && (
              <View className="px-2 py-1 rounded-md bg-white/5 border border-white/10">
                <Text className="text-gray-400 text-xs">
                  +{item.symptoms.length - 3} more
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Arrow */}
        <View className="ml-2 justify-center">
          <Text className="text-gray-400 text-lg">›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

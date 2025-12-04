import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface InfoCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

export function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <View className="flex-1 bg-[#232328] border border-white/10 rounded-2xl py-4 px-3 items-center">
      <Ionicons name={icon} size={22} color="#9c5cf6" />
      <View className="h-2" />
      <Text className="text-white/50 text-xs mb-1">{label}</Text>
      <Text className="text-white text-sm font-semibold text-center">{value}</Text>
    </View>
  );
}

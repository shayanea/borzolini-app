import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface InfoCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

export function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <View className="flex-1 bg-[#232328] border border-white/10 rounded-2xl p-4">
      <View className="flex-row items-center mb-2">
        <Ionicons name={icon} size={20} color="#9c5cf6" />
        <Text className="text-white/60 text-sm ml-2">{label}</Text>
      </View>
      <Text className="text-white text-lg font-semibold">{value}</Text>
    </View>
  );
}

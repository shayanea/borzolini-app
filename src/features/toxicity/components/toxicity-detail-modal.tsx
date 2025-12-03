import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ToxicityItem } from '../types';
import { SeverityBadge } from './severity-badge';

interface ToxicityDetailModalProps {
  item: ToxicityItem | null;
  visible: boolean;
  onClose: () => void;
}

export function ToxicityDetailModal({ item, visible, onClose }: ToxicityDetailModalProps) {
  if (!item) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-[#17171c] rounded-t-3xl max-h-[85%]">
          {/* Header */}
          <View className="flex-row items-center justify-between p-6 pb-4 border-b border-white/10">
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <SeverityBadge severity={item.severity} />
                {item.scientificName && (
                  <Text className="text-gray-400 text-xs ml-3 italic">
                    {item.scientificName}
                  </Text>
                )}
              </View>
              <Text className="text-white font-bold text-2xl">
                {item.name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 rounded-full bg-white/10 items-center justify-center ml-3"
            >
              <Text className="text-white text-xl">×</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView className="px-6 py-4" showsVerticalScrollIndicator={false}>
            {/* Description */}
            <Text className="text-gray-300 text-base leading-6 mb-6">
              {item.description}
            </Text>

            {/* Symptoms */}
            <View className="mb-6">
              <Text className="text-white font-bold text-sm mb-3 uppercase tracking-wide">
                Symptoms
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {item.symptoms.map((symptom, index) => (
                  <View
                    key={index}
                    className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20"
                  >
                    <Text className="text-red-400 text-sm">{symptom}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Safe Alternative */}
            {item.safeAlternative && (
              <View className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 mb-6">
                <View className="flex-row items-center mb-2">
                  <View className="w-6 h-6 rounded-full bg-green-500/20 items-center justify-center mr-2">
                    <Text className="text-green-500 text-sm">✓</Text>
                  </View>
                  <Text className="text-green-400 font-bold text-sm uppercase tracking-wide">
                    Safe Alternative
                  </Text>
                </View>
                <Text className="text-green-300 text-base">
                  {item.safeAlternative}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

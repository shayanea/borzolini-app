import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface ScanStatusProps {
  isComplete: boolean;
  message: string;
  onScanAgain?: () => void;
}

export function ScanStatus({ isComplete, message, onScanAgain }: ScanStatusProps) {
  return (
    <View className="mb-6">
      {/* Status indicator */}
      <View className="flex-row items-start mb-4">
        <View 
          className={`w-6 h-6 rounded-full items-center justify-center mr-3 ${
            isComplete ? 'bg-emerald-500/20' : 'bg-yellow-500/20'
          }`}
        >
          <Ionicons 
            name={isComplete ? 'checkmark-circle' : 'time'} 
            size={16} 
            color={isComplete ? '#10b981' : '#eab308'} 
          />
        </View>
        <View className="flex-1">
          <Text className={`font-semibold mb-1 ${isComplete ? 'text-emerald-400' : 'text-yellow-400'}`}>
            {isComplete ? 'Scan Complete' : 'Scanning...'}
          </Text>
          <Text className="text-gray-400 text-sm leading-5">{message}</Text>
        </View>
      </View>

      {/* Scan Again Button */}
      {isComplete && onScanAgain && (
        <TouchableOpacity
          className="bg-[#2a2a30] border border-white/10 rounded-xl py-3 items-center"
          onPress={onScanAgain}
          activeOpacity={0.7}
        >
          <Text className="text-white font-semibold">Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

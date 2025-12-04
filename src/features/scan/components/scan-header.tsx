import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Text, View } from 'react-native';
import scanIcon from '../../../../assets/icons/scan.png';

interface ScanHeaderProps {
  petName?: string;
}

export function ScanHeader({ petName = 'Bailey' }: ScanHeaderProps) {
  return (
    <View className="mb-6">
      {/* Title with icon */}
      <View className="flex-row items-center mb-1">
        <View className="w-8 h-8 rounded-full bg-[#2d2638] items-center justify-center mr-3">
          <Image
            source={scanIcon}
            className="w-5 h-5"
            resizeMode="contain"
            tintColor="#c084fc"
          />
        </View>
        <MaskedView
          maskElement={
            <Text className="text-2xl font-bold">AI Health Scan</Text>
          }
        >
          <LinearGradient
            colors={['#a855f7', '#22d3ee']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text className="text-2xl font-bold opacity-0">AI Health Scan</Text>
          </LinearGradient>
        </MaskedView>
      </View>
      
      {/* Subtitle */}
      <Text className="text-gray-400 text-sm ml-11">
        Advanced AI vision and health monitoring for {petName}
      </Text>
    </View>
  );
}

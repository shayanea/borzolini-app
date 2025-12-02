import { Card } from '@/components/ui/card';
import { Ionicons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
// Importing icon statically to avoid `require()` usage which is disallowed by ESLint
import communityIcon from '../../../assets/icons/community.png';

export function DiscordWidget() {
  const handlePress = () => {
    // TODO: Open Discord link or deep link to Discord app
    console.log('Opening Discord community...');
  };

  return (
    <Card className="bg-[#5865F2] border-0 p-0 overflow-hidden">
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        className="flex-row items-center justify-between"
      >
        {/* Left side: Icon and Text */}
        <View className="flex-row items-center flex-1">
          {/* Discord Icon */}
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-4">
            <Image
              source={communityIcon}
              className="w-7 h-7"
              resizeMode="contain"
							tintColor={'#fff'}
            />
          </View>

          {/* Text Content */}
          <View className="flex-1">
            <Text className="text-white text-base font-bold mb-0.5">
              Join the Community
            </Text>
            <Text className="text-white/80 text-xs">
              Connect with 12k+ pet owners on Discord
            </Text>
          </View>
        </View>

        {/* Right Arrow */}
        <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.8)" />
      </TouchableOpacity>
    </Card>
  );
}

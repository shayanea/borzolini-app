import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export function BreedWikiHeader(): JSX.Element {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <View className="border-b border-white/5">
      {/* Navigation Bar */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-[#2a2a30] items-center justify-center"
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View className="w-10" />
      </View>

      {/* Content Header */}
      <View className="px-6 pb-6">
        <Text className="text-3xl font-bold text-white mb-2">Breed Wiki</Text>
        <Text className="text-gray-400 text-sm mb-4">
          Discover comprehensive guides about your favorite breeds.
        </Text>

        <View className="flex-row items-center bg-[#232328] border border-white/10 rounded-full px-4 py-3">
          <Ionicons name="search" size={18} color="#4b5563" />
          <TextInput
            className="flex-1 ml-2 text-white"
            placeholder="Search for a breed..."
            placeholderTextColor="#6B7280"
            value={searchTerm}
            onChangeText={setSearchTerm}
            returnKeyType="search"
          />
        </View>
      </View>
    </View>
  );
}


import { Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { resourcesService } from '../../services/resources.service';

export function ResourceHeader(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void resourcesService.getActiveResources(searchTerm || undefined);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  return (
    <View>
      <Text className="text-3xl font-bold text-white mb-4">Resources</Text>

      <View className="flex-row items-center bg-[#232328] border border-white/10 rounded-full px-4 py-3">
        <Ionicons name="search" size={18} color="#4b5563" />
        <TextInput
          className="flex-1 ml-2 text-white"
          placeholder="Search guides, vets, or tips..."
          placeholderTextColor="#6B7280"
          value={searchTerm}
          onChangeText={setSearchTerm}
          returnKeyType="search"
        />
      </View>
    </View>
  );
}

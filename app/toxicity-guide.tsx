import { ToxicityDetailModal, ToxicityItemCard } from '@/features/toxicity/components';
import { toxicityService } from '@/features/toxicity/services/toxicity.service';
import { ToxicityItem, ToxicityType } from '@/features/toxicity/types';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TabType = 'foods' | 'plants';

export default function ToxicityGuideScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ tab?: TabType }>();
  
  const [activeTab, setActiveTab] = useState<TabType>(params.tab || 'foods');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<ToxicityItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ToxicityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ToxicityItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = activeTab === 'foods' 
        ? await toxicityService.getToxicFoods()
        : await toxicityService.getToxicPlants();
      setItems(data);
      setFilteredItems(data);
    } catch (error) {
      console.error('Failed to load items:', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  // Load items based on active tab
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // Filter items based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const type = activeTab === 'foods' ? ToxicityType.FOOD : ToxicityType.PLANT;
      toxicityService.searchToxicItems(searchQuery, type).then(setFilteredItems);
    } else {
      setFilteredItems(items);
    }
  }, [searchQuery, items, activeTab]);

  const handleItemPress = (item: ToxicityItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#17171c]" edges={['top']}>
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center mb-4"
        >
          <Ionicons name="chevron-back" size={24} color="#9ca3af" />
          <Text className="text-gray-400 text-base ml-1">Back to Resources</Text>
        </TouchableOpacity>

        <Text className="text-white font-bold text-3xl mb-2">
          Toxicity Guide
        </Text>
        <Text className="text-gray-400 text-base mb-4">
          Keep your pets safe by identifying harmful foods and plants.
        </Text>

        {/* Search Bar */}
        <View className="bg-[#232328] border border-white/10 rounded-xl px-4 py-3 flex-row items-center mb-4">
          <Ionicons name="search" size={20} color="#9ca3af" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search chocolate, lilies, symptoms..."
            placeholderTextColor="#6b7280"
            className="flex-1 ml-3 text-white text-base"
          />
        </View>

        {/* Tabs */}
        <View className="flex-row bg-[#232328] rounded-xl p-1">
          <TouchableOpacity
            onPress={() => setActiveTab('foods')}
            className={`flex-1 py-3 rounded-lg ${
              activeTab === 'foods' ? 'bg-[#17171c]' : ''
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === 'foods' ? 'text-white' : 'text-gray-400'
              }`}
            >
              Toxic Foods
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('plants')}
            className={`flex-1 py-3 rounded-lg ${
              activeTab === 'plants' ? 'bg-[#17171c]' : ''
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === 'plants' ? 'text-white' : 'text-gray-400'
              }`}
            >
              Toxic Plants
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1 px-6 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View className="items-center justify-center py-12">
            <ActivityIndicator size="large" color="#9c5cf6" />
            <Text className="text-gray-400 mt-4">Loading...</Text>
          </View>
        ) : filteredItems.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-400 text-center">
              {searchQuery ? 'No results found' : 'No items available'}
            </Text>
          </View>
        ) : (
          filteredItems.map((item) => (
            <ToxicityItemCard
              key={item.id}
              item={item}
              onPress={() => handleItemPress(item)}
            />
          ))
        )}

        {/* Emergency Contact Section */}
        <View className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 mt-4 mb-24">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-full bg-blue-500/20 items-center justify-center mr-3">
              <Ionicons name="information-circle" size={24} color="#3b82f6" />
            </View>
            <Text className="text-white font-bold text-lg flex-1">
              Emergency Contact
            </Text>
          </View>
          <Text className="text-gray-300 text-sm leading-6 mb-3">
            If you suspect your pet has ingested something toxic, contact your vet or the Pet Poison Helpline immediately.
          </Text>
          <TouchableOpacity className="bg-blue-500 rounded-xl py-3 items-center">
            <Text className="text-white font-bold text-base">
              Call Poison Control
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Detail Modal */}
      <ToxicityDetailModal
        item={selectedItem}
        visible={modalVisible}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
}

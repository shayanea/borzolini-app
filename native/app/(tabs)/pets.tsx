import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserPets } from '@/services/pets';

export default function PetsScreen() {
  const { data: pets, isLoading, refetch } = useUserPets();

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 py-6"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="text-3xl font-bold text-secondary-900 mb-2">
              Pets
            </Text>
            <Text className="text-secondary-600">
              Pet Profiles & Health Hub
            </Text>
          </View>
          <TouchableOpacity className="bg-primary-500 p-3 rounded-full">
            <MaterialCommunityIcons name="plus" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {isLoading && !pets ? (
          <View className="items-center justify-center py-12">
            <ActivityIndicator size="large" color="#fb8500" />
          </View>
        ) : !pets || pets.length === 0 ? (
          <View className="bg-white rounded-xl p-8 items-center justify-center mt-8">
            <MaterialCommunityIcons
              name="paw-off"
              size={64}
              color="#cbd5e1"
            />
            <Text className="text-xl font-semibold text-secondary-900 mt-4 mb-2">
              No Pets Yet
            </Text>
            <Text className="text-secondary-600 text-center mb-6">
              Add your first pet to start tracking their health
            </Text>
            <TouchableOpacity className="bg-primary-500 px-6 py-3 rounded-lg">
              <Text className="text-white font-semibold">Add Pet</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="space-y-4">
            {pets.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                className="bg-white rounded-xl p-4 flex-row items-center mb-4 shadow-sm"
              >
                <View className="w-16 h-16 bg-secondary-100 rounded-full items-center justify-center">
                  {pet.photo_url ? (
                    // TODO: Use Image component
                     <MaterialCommunityIcons name="dog" size={32} color="#64748b" />
                  ) : (
                    <MaterialCommunityIcons
                      name={pet.species === 'cat' ? 'cat' : 'dog'}
                      size={32}
                      color="#64748b"
                    />
                  )}
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-lg font-semibold text-secondary-900">
                    {pet.name}
                  </Text>
                  <Text className="text-secondary-600">
                    {pet.breed || pet.species} • {pet.age ? `${pet.age} yrs` : 'Age unknown'}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#94a3b8"
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Health Log Entry Point */}
        <View className="bg-white rounded-xl p-6 mt-6 shadow-sm">
          <Text className="text-lg font-semibold text-secondary-900 mb-4">
            Health Log
          </Text>
          <Text className="text-secondary-600 mb-4">
            Track your pet's health records and medical history
          </Text>
          <TouchableOpacity className="bg-primary-50 px-4 py-3 rounded-lg">
            <Text className="text-primary-600 font-medium">View Health Log</Text>
          </TouchableOpacity>
        </View>

        {/* Skin Detection Entry Point */}
        <View className="bg-white rounded-xl p-6 mt-4 shadow-sm">
          <View className="flex-row items-center mb-4">
            <MaterialCommunityIcons
              name="camera"
              size={24}
              color="#fb8500"
            />
            <Text className="text-lg font-semibold text-secondary-900 ml-3">
              Skin Detection
            </Text>
          </View>
          <Text className="text-secondary-600 mb-4">
            Scan and detect skin issues with AI-powered technology
          </Text>
          <TouchableOpacity className="bg-primary-500 px-4 py-3 rounded-lg">
            <Text className="text-white font-medium text-center">
              Start Scan
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { AiHealthInsightWidget } from '@/components/home/ai-health-insight-widget';
import { DiscordWidget } from '@/components/home/discord-widget';
import { FaqWidget } from '@/components/home/faq-widget';
import { QuickActionsGrid } from '@/components/home/quick-actions-grid';
import { TrainingProgressWidget } from '@/components/home/training-progress-widget';
import { WeightHistoryWidget } from '@/components/home/weight-history-widget';
import { SidebarMenu } from '@/components/sidebar-menu';
import { useAuth } from '@/hooks/use-auth';
import { Ionicons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user } = useAuth();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#17171c]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pt-6 pb-28"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center gap-3 flex-1">
            <TouchableOpacity
              onPress={() => setSidebarVisible(true)}
              className="items-center justify-center"
            >
              <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
            <View>
              <Text className="text-gray-400 text-sm mb-1">Welcome back,</Text>
              <MaskedView
                maskElement={
                  <Text className="text-2xl font-bold">{user?.firstName}</Text>
                }
              >
                <LinearGradient
                  colors={['#a855f7', '#ec4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text className="text-2xl font-bold opacity-0">
                    {user?.firstName}
                  </Text>
                </LinearGradient>
              </MaskedView>
            </View>
          </View>

          <TouchableOpacity className="w-10 h-10 rounded-full bg-[#2a2a30] items-center justify-center">
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Discord Community Widget */}
        <DiscordWidget />

        {/* Quick Actions Grid */}
        <View className="mt-4">
          <QuickActionsGrid />
        </View>

        {/* Weight History Widget */}
        <WeightHistoryWidget />

        {/* AI Health Insight Widget */}
        <AiHealthInsightWidget />

        {/* Training Progress Widget */}
        <TrainingProgressWidget />

        {/* FAQ Widget */}
        <FaqWidget />
      </ScrollView>

      {/* Sidebar Menu */}
      <SidebarMenu
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
    </SafeAreaView>
  );
}

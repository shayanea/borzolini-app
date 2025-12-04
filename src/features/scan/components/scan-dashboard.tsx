import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    RefreshControl,
    ScrollView,
    View,
} from 'react-native';

import { useUserPets } from '@/services/pets';
import { AIInsight, RealTimeMetrics as RealTimeMetricsType } from '../types';
import { InsightsSection } from './insights-section';
import { RealTimeMetrics } from './real-time-metrics';
import { ScanHeader } from './scan-header';
import { ScanStatus } from './scan-status';
import { UploadPhotoSection } from './upload-photo-section';
import { VisionAnalysisCard } from './vision-analysis-card';

// Mock data for demonstration
const mockMetrics: RealTimeMetricsType = {
  heartRate: { value: 98, unit: 'bpm', status: 'Normal' },
  bodyTemp: { value: 38.5, unit: '°C', status: 'Normal' },
};

const mockInsights: AIInsight[] = [
  {
    id: '1',
    type: 'body_condition',
    title: 'Body Condition',
    description: 'Bailey is maintaining optimal weight. Keep current exercise routine.',
    status: 'good',
  },
  {
    id: '2',
    type: 'coat_quality',
    title: 'Coat Quality',
    description: 'Fur appears healthy and shiny. No signs of skin issues detected.',
    status: 'good',
  },
  {
    id: '3',
    type: 'hydration',
    title: 'Hydration',
    description: 'Ensure Bailey drinks enough water, especially after exercise.',
    status: 'warning',
  },
];

export function ScanDashboard() {
  const { data: pets, isLoading: petsLoading } = useUserPets();
  const [refreshing, setRefreshing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [scanComplete, setScanComplete] = useState(true);
  const [scanMessage, setScanMessage] = useState(
    "Bailey's vision analysis shows normal eye health. No abnormalities detected."
  );
  const [isUploading, setIsUploading] = useState(false);

  // Get first pet's name or default to "Bailey"
  const petName = pets?.[0]?.name || 'Bailey';

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Reset state on focus if needed
    }, [])
  );

  const handleScanAgain = () => {
    setScanComplete(false);
    setIsScanning(true);
    setScanProgress(0);

    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanComplete(true);
          return 100;
        }
        return next;
      });
    }, 300);
  };

  const handleChoosePhoto = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please grant access to your photo library to upload pet photos for analysis.'
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        setIsUploading(true);
        
        // Start scan with the selected image
        setScanComplete(false);
        setIsScanning(true);
        setScanProgress(0);

        // Simulate scan progress
        const interval = setInterval(() => {
          setScanProgress((prev) => {
            const next = prev + 5;
            if (next >= 100) {
              clearInterval(interval);
              setIsScanning(false);
              setScanComplete(true);
              setIsUploading(false);
              setScanMessage(
                `${petName}'s scan analysis complete. Overall health looks good!`
              );
              return 100;
            }
            return next;
          });
        }, 200);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
      setIsUploading(false);
    }
  };

  if (petsLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#17171c]">
        <ActivityIndicator size="large" color="#9c5cf6" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#17171c]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 py-6 pb-32"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9c5cf6']}
            tintColor="#9c5cf6"
          />
        }
      >
        <ScanHeader petName={petName} />

        <VisionAnalysisCard progress={scanProgress} isScanning={isScanning} />

        <ScanStatus
          isComplete={scanComplete}
          message={scanMessage}
          onScanAgain={handleScanAgain}
        />

        <RealTimeMetrics metrics={mockMetrics} />

        <InsightsSection insights={mockInsights} />

        <UploadPhotoSection
          onChoosePhoto={handleChoosePhoto}
          isLoading={isUploading}
        />
      </ScrollView>
    </View>
  );
}

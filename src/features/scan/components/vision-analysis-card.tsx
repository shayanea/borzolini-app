import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';

interface VisionAnalysisCardProps {
  progress: number; // 0-100
  isScanning?: boolean;
}

const styles = StyleSheet.create({
  thermalGradient: {
    borderRadius: 16,
  },
  thermalOverlay: {
    flex: 1,
  },
});

export function VisionAnalysisCard({ progress = 100 }: VisionAnalysisCardProps) {
  // Circle dimensions
  const size = 180;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <View className="bg-[#232328] border border-white/10 rounded-2xl p-4 mb-4">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <View className="w-2 h-2 rounded-full bg-purple-500 mr-2" />
        <Text className="text-white font-semibold">Vision Analysis</Text>
      </View>

      {/* Scan Visualization */}
      <View className="items-center justify-center py-4">
        <View>
          {/* Background thermal-like visualization */}
          <View className="relative items-center justify-center">
            <LinearGradient
              colors={['#1a1a2e', '#16213e', '#0f3460', '#533483']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-40 h-40 rounded-xl overflow-hidden"
              style={styles.thermalGradient}
            >
              {/* Simulated thermal overlay */}
              <View className="absolute inset-0">
                <LinearGradient
                  colors={['transparent', 'rgba(56, 189, 248, 0.3)', 'rgba(168, 85, 247, 0.4)', 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.thermalOverlay}
                />
              </View>
            </LinearGradient>

            {/* Progress ring overlay */}
            <View className="absolute">
              <Svg width={size} height={size}>
                <Defs>
                  <SvgLinearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#a855f7" />
                    <Stop offset="100%" stopColor="#22d3ee" />
                  </SvgLinearGradient>
                </Defs>
                
                {/* Background circle */}
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                
                {/* Progress circle */}
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="url(#progressGradient)"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={progressOffset}
                  rotation={-90}
                  origin={`${size / 2}, ${size / 2}`}
                />
              </Svg>
              
              {/* Progress text */}
              <View className="absolute inset-0 items-center justify-center">
                <Text className="text-white text-3xl font-bold">{progress}%</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

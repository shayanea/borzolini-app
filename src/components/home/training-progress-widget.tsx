import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Card } from '@/components/ui/card';
import trainingProgressIcon from '../../../assets/icons/training-progress.png';

interface TrainingProgram {
  id: string;
  name: string;
  progress: number; // 0-100
}

const trainingPrograms: TrainingProgram[] = [
  {
    id: 'basic-obedience',
    name: 'Basic Obedience',
    progress: 75,
  },
  {
    id: 'agility-starter',
    name: 'Agility Starter',
    progress: 30,
  },
];

export function TrainingProgressWidget(): JSX.Element {
  return (
    <View className="mt-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <Image
            source={trainingProgressIcon}
            className="w-5 h-5 mr-2"
            resizeMode="contain"
            tintColor="#f0b100"
          />
          <Text className="text-white font-bold text-lg">
            Training Progress
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.7}>
          <Text className="text-xs font-medium text-[#a855f7]">View All</Text>
        </TouchableOpacity>
      </View>

      {/* Card */}
      <Card className="bg-[#1b1b21] border border-white/5 p-4">
        {trainingPrograms.map((program, index) => {
          const isLast = index === trainingPrograms.length - 1;

          return (
            <View key={program.id} className={!isLast ? 'mb-4' : ''}>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-white text-sm font-medium">
                  {program.name}
                </Text>
                <Text className="text-gray-400 text-xs">
                  {program.progress}%
                </Text>
              </View>

              {/* Progress Track */}
              <View className="h-2 rounded-full bg-[#a855f715] overflow-hidden">
                <View
                  className="h-2 rounded-full bg-[#a855f7]"
                  style={{ width: `${program.progress}%` }}
                />
              </View>
            </View>
          );
        })}
      </Card>
    </View>
  );
}

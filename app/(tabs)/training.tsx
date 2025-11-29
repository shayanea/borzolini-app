import { SafeAreaView } from 'react-native-safe-area-context';
import { TrainingDashboard } from '../../src/features/training/components/training-dashboard';

export default function TrainingScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#E5E7EB]" edges={['top']}>
      <TrainingDashboard />
    </SafeAreaView>
  );
}


import { ScanDashboard } from '@/features/scan/components';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScanScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#17171c]" edges={['top']}>
      <ScanDashboard />
    </SafeAreaView>
  );
}

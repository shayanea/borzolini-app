import { SafeAreaView } from 'react-native-safe-area-context';
import { ScanDashboard } from '../../src/features/scan/components/scan-dashboard';

export default function ScanScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#17171c]" edges={['top']}>
      <ScanDashboard />
    </SafeAreaView>
  );
}

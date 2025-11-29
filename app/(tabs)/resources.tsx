import { SafeAreaView } from 'react-native-safe-area-context';
import { ResourcesList } from '../../src/features/resources/components/resources-list';

export default function ResourcesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#E5E7EB]" edges={['top']}>
      <ResourcesList />
    </SafeAreaView>
  );
}

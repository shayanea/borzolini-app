import { BlurView } from 'expo-blur';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageSourcePropType,
} from 'react-native';

// Static icon imports to comply with ESLint no-require-imports rule
import houseIcon from '../../../assets/icons/house.png';
import wikiIcon from '../../../assets/icons/wiki.png';
import clinicsIcon from '../../../assets/icons/clinics.png';
import adoptIcon from '../../../assets/icons/adopt.png';

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: ImageSourcePropType;
  backgroundColor: string;
  iconBackgroundColor: string;
	iconColor: string;
  onPress: () => void;
}

const quickActions: QuickAction[] = [
  {
    id: 'pet-hosting',
    title: 'Pet Hosting',
    subtitle: 'Find a sitter nearby',
    icon: houseIcon,
		iconColor: '#7c3aed',
    backgroundColor: 'rgba(124, 58, 237, 0.15)', 
    iconBackgroundColor: '#7c3aed20',
    onPress: () => console.log('Pet Hosting pressed'),
  },
  {
    id: 'breed-wiki',
    title: 'Breed Wiki',
    subtitle: 'Learn about breeds',
    icon: wikiIcon,	
		iconColor: "#c2410c",
    backgroundColor: 'rgba(194, 65, 12, 0.15)', 
    iconBackgroundColor: '#c2410c20',
    onPress: () => console.log('Breed Wiki pressed'),
  },
  {
    id: 'clinic-finder',
    title: 'Clinic Finder',
    subtitle: 'Locate nearby vets',
    icon: clinicsIcon,
		iconColor: '#2563eb',	
    backgroundColor: 'rgba(37, 99, 235, 0.15)', 
    iconBackgroundColor: '#2563eb20',
    onPress: () => console.log('Clinic Finder pressed'),
  },
  {
    id: 'adopt',
    title: 'Adopt',
    subtitle: 'Find a new friend',
    icon: adoptIcon,
		iconColor: '#dc2626',
    backgroundColor: 'rgba(220, 38, 38, 0.15)', 	
    iconBackgroundColor: '#dc262620',
    onPress: () => console.log('Adopt pressed'),
  },
];

export function QuickActionsGrid() {
  return (
    <View className="flex-row flex-wrap gap-3">
      {quickActions.map((action) => (
        <TouchableOpacity
          key={action.id}
          onPress={action.onPress}
          activeOpacity={0.7}
          className="flex-1 min-w-[45%] rounded-2xl overflow-hidden border border-white/10"
        >
          {/* Glassmorphism Blur Background */}
          <BlurView
            intensity={20}
            tint="dark"
            className="p-4"
            style={{ backgroundColor: action.backgroundColor }}
          >
            {/* Icon Container */}
            <View
              className="w-10 h-10 rounded-2xl items-center justify-center mb-3"
              style={{ backgroundColor: action.iconBackgroundColor }}
            >
              <Image
                source={action.icon}
                className="w-6 h-6"
                resizeMode="contain"
                tintColor={action.iconColor}
              />
            </View>

            {/* Text Content */}
            <View>
              <Text 
                className="text-base font-semibold mb-1"
                style={{ color: action.iconColor }}
              >
                {action.title}
              </Text>
              <Text className="text-gray-400 text-xs">
                {action.subtitle}
              </Text>
            </View>
          </BlurView>
        </TouchableOpacity>
      ))}
    </View>
  );
}

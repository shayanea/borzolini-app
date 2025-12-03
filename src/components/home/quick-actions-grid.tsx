import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
// Static icon imports to comply with ESLint no-require-imports rule
import adoptIcon from '../../../assets/icons/adopt.png';
import clinicsIcon from '../../../assets/icons/clinics.png';
import houseIcon from '../../../assets/icons/house.png';
import wikiIcon from '../../../assets/icons/wiki.png';

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: ImageSourcePropType;
  titleColor: string;
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
    titleColor: '#c4b5fd',
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    iconBackgroundColor: '#7c3aed20',
    onPress: () => console.log('Pet Hosting pressed'),
  },
  {
    id: 'breed-wiki',
    title: 'Breed Wiki',
    subtitle: 'Learn about breeds',
    icon: wikiIcon,
    iconColor: '#ea580c', // vivid orange for icon
    titleColor: '#fed7aa', // soft orange for title
    backgroundColor: 'rgba(234, 88, 12, 0.2)', // more pronounced orange card background
    iconBackgroundColor: '#ea580c20',
    onPress: () => console.log('Breed Wiki pressed'),
  },
  {
    id: 'clinic-finder',
    title: 'Clinic Finder',
    subtitle: 'Locate nearby vets',
    icon: clinicsIcon,
    iconColor: '#2563eb',
    titleColor: '#93c5fd',
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
    titleColor: '#fecaca',
    backgroundColor: 'rgba(220, 38, 38, 0.15)',
    iconBackgroundColor: '#dc262620',
    onPress: () => console.log('Adopt pressed'),
  },
];

export function QuickActionsGrid() {
  return (
    <View className="flex-row flex-wrap gap-3">
      {quickActions.map(action => (
        <TouchableOpacity
          key={action.id}
          onPress={action.onPress}
          activeOpacity={0.7}
          className="glass-card flex-1 min-w-[45%] h-32"
        >
          {/* Gradient + Blur background layers */}
          <LinearGradient
            colors={[action.backgroundColor, 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />

          <BlurView
            intensity={30}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />

          {/* Card padding & content wrapper */}
          <View className="p-4 flex-1 justify-between">
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
                style={{ color: action.titleColor }}
              >
                {action.title}
              </Text>
              <Text className="text-gray-400 text-xs">{action.subtitle}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

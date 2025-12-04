import { Breed } from '@/types/pet';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';

interface HealthTabProps {
  breed: Breed;
}

// Generate interesting facts from breed data
function generateFacts(breed: Breed): string[] {
  const facts: string[] = [];
  
  if (breed.origin_history) {
    facts.push(breed.origin_history);
  }
  
  if (breed.origin_country) {
    facts.push(`Originated from ${breed.origin_country}`);
  }
  
  if (breed.size_category) {
    const sizeDescriptions: Record<string, string> = {
      tiny: 'These tiny companions are perfect for apartment living',
      small: 'Small size makes them great for various living situations',
      medium: 'Medium-sized dogs are versatile and adaptable',
      large: 'Large breeds need plenty of space and exercise',
      giant: 'Giant breeds are gentle giants requiring substantial space'
    };
    facts.push(sizeDescriptions[breed.size_category] || '');
  }

  return facts.filter(Boolean);
}

export function HealthTab({ breed }: HealthTabProps) {
  const healthIssues = breed.health_risks || [];
  const facts = generateFacts(breed);

  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      {/* Common Health Issues */}
      <View className="bg-[#232328] rounded-2xl p-4 mb-4">
        <View className="flex-row items-center mb-4">
          <Text className="text-lg">✈️</Text>
          <Text className="text-white text-base font-semibold ml-2">Common Health Issues</Text>
        </View>
        {healthIssues.length > 0 ? (
          healthIssues.map((issue, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <Text className="text-[#9c5cf6] mr-3 text-xs mt-1">●</Text>
              <Text className="text-white/60 text-sm flex-1">{issue}</Text>
            </View>
          ))
        ) : (
          <Text className="text-white/50 text-sm italic">No common health issues reported</Text>
        )}
      </View>

      {/* Did you know? */}
      {facts.length > 0 && (
        <View className="bg-[#232328] rounded-2xl p-4 mb-4">
          <View className="flex-row items-center mb-4">
            <Ionicons name="globe-outline" size={18} color="#3b82f6" />
            <Text className="text-[#3b82f6] text-base font-semibold ml-2">Did you know?</Text>
          </View>
          {facts.map((fact, index) => (
            <View key={index} className={index < facts.length - 1 ? 'mb-3' : ''}>
              <Text className="text-white/60 text-sm italic leading-5">"{fact}"</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

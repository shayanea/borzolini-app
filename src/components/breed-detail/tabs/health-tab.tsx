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
    <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
      {/* Common Health Issues */}
      <View className="mb-6">
        <View className="flex-row items-center mb-3">
          <Ionicons name="medical" size={20} color="#ef4444" />
          <Text className="text-white text-lg font-semibold ml-2">Common Health Issues</Text>
        </View>
        <View className="bg-[#232328] border border-white/10 rounded-2xl p-4">
          {healthIssues.length > 0 ? (
            healthIssues.map((issue, index) => (
              <View key={index} className="flex-row mb-2 last:mb-0">
                <Text className="text-[#ef4444] mr-2">•</Text>
                <Text className="text-white/70 flex-1">{issue}</Text>
              </View>
            ))
          ) : (
            <Text className="text-white/50 italic">No common health issues reported</Text>
          )}
        </View>
      </View>

      {/* Did you know? */}
      {facts.length > 0 && (
        <View className="mb-6">
          <View className="flex-row items-center mb-3">
            <Ionicons name="bulb" size={20} color="#3b82f6" />
            <Text className="text-white text-lg font-semibold ml-2">Did you know?</Text>
          </View>
          <View className="bg-[#232328] border border-white/10 rounded-2xl p-4">
            {facts.map((fact, index) => (
              <View key={index} className="mb-3 last:mb-0">
                <Text className="text-white/70 italic leading-6">"{fact}"</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

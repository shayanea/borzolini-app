import { PetSpecies } from '@/types/pet/pet-enums';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import type {
	Activity,
	Allergy,
	BreedResult,
	Grooming,
	KidLevel,
	QuestionnaireAnswers,
	SpaceScore,
	Vibe,
} from '../types/questionnaire';
import { calculateBreedResult } from '../utils/calculate-breed';

interface ChatMessage {
  id: string;
  type: 'question' | 'answer' | 'loading' | 'result';
  content?: string;
  question?: QuestionData;
  answer?: string;
  result?: BreedResult;
}

interface QuestionData {
  title: string;
  description: string;
  type: 'species' | 'kid' | 'space' | 'allergy' | 'vibe' | 'grooming' | 'activity';
  options?: Array<{ label: string; value: KidLevel | Allergy | Vibe | Grooming | Activity | PetSpecies }>;
  spaceOptions?: SpaceScore[];
}

interface CompanionQuestionnaireProps {
  onComplete?: (result: BreedResult) => void;
  onResultReady?: () => void;
}

const QUESTIONS: QuestionData[] = [
  {
    title: 'What type of pet?',
    description: 'Choose the type of companion you\'re looking for.',
    type: 'species',
    options: [
      { label: '🐱 Cat', value: PetSpecies.CAT },
      { label: '🐕 Dog', value: PetSpecies.DOG },
    ],
  },
  {
    title: 'Household Situation?',
    description: 'Tell us about your household to find the perfect match.',
    type: 'kid',
    options: [
      { label: 'Adults only (including seniors)', value: 'none' },
      { label: 'Wild toddlers (under 6)', value: 'toddlers' },
      { label: 'Energetic school-kids (6-12)', value: 'school' },
      { label: 'Teens or calm crew', value: 'teens' },
    ],
  },
  {
    title: 'Space Squeeze (1-5)',
    description:
      'How much space do you have? Rate from 1 (tiny studio) to 5 (roomy with balcony).',
    type: 'space',
    spaceOptions: [1, 2, 3, 4, 5],
  },
  {
    title: 'Allergy Alert?',
    description: 'Help us find a breed that fits your allergy needs.',
    type: 'allergy',
    options: [
      { label: 'High allergies', value: 'high' },
      { label: 'Mild / none', value: 'none' },
      { label: 'Other pets in mix', value: 'otherPets' },
    ],
  },
  {
    title: 'Interaction Style?',
    description: 'What kind of interaction are you looking for with your pet?',
    type: 'vibe',
    options: [
      { label: 'High-touch hugs', value: 'cuddly' },
      { label: 'Play bursts', value: 'playful' },
      { label: 'Watch from afar', value: 'independent' },
    ],
  },
  {
    title: 'Grooming Commitment?',
    description: 'How much time can you dedicate to brushing and care?',
    type: 'grooming',
    options: [
      { label: 'Low (Wash & Wear)', value: 'low' },
      { label: 'Medium (Weekly brush)', value: 'medium' },
      { label: 'High (Daily spa day)', value: 'high' },
    ],
  },
  {
    title: 'Activity Level?',
    description: 'What activity level can you provide for your pet?',
    type: 'activity',
    options: [
      { label: 'Couch Potato', value: 'low' },
      { label: 'Weekend Warrior', value: 'medium' },
      { label: 'Daily Athlete', value: 'high' },
    ],
  },
];

export function CompanionQuestionnaire({
  onComplete,
  onResultReady,
}: CompanionQuestionnaireProps) {
  const initialQuestion = QUESTIONS[0];
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'question-0',
      type: 'question',
      question: initialQuestion,
      content: initialQuestion.title,
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuestionnaireAnswers>>({});
  const [selectedSpecies, setSelectedSpecies] = useState<PetSpecies | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const addQuestionMessage = (index: number) => {
    const question = QUESTIONS[index];
    setMessages(prev => [
      ...prev,
      {
        id: `question-${index}`,
        type: 'question',
        question,
        content: question.title,
      },
    ]);
  };

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const addAnswerMessage = (answer: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: `answer-${Date.now()}`,
        type: 'answer',
        answer,
      },
    ]);
  };

  const addLoadingMessage = () => {
    setMessages(prev => [
      ...prev,
      {
        id: `loading-${Date.now()}`,
        type: 'loading',
      },
    ]);
  };

  const removeLoadingMessage = () => {
    setMessages(prev => prev.filter(msg => msg.type !== 'loading'));
  };

  const addResultMessage = (result: BreedResult) => {
    setMessages(prev => [
      ...prev,
      {
        id: `result-${Date.now()}`,
        type: 'result',
        result,
      },
    ]);
  };

  const [step3ResultShown, setStep3ResultShown] = useState(false);

  const handleAnswer = async (
    value: KidLevel | SpaceScore | Allergy | Vibe | Grooming | Activity | PetSpecies,
    label: string,
  ) => {
    // Update answers
    const question = QUESTIONS[currentQuestionIndex];
    const newAnswers = { ...answers };

    if (question.type === 'species') {
      setSelectedSpecies(value as PetSpecies);
    } else if (question.type === 'kid') {
      newAnswers.kidLevel = value as KidLevel;
    } else if (question.type === 'space') {
      newAnswers.spaceScore = value as SpaceScore;
    } else if (question.type === 'allergy') {
      newAnswers.allergy = value as Allergy;
    } else if (question.type === 'vibe') {
      newAnswers.vibe = value as Vibe;
    } else if (question.type === 'grooming') {
      newAnswers.grooming = value as Grooming;
    } else if (question.type === 'activity') {
      newAnswers.activity = value as Activity;
    }

    setAnswers(newAnswers);

    // Add answer message
    addAnswerMessage(label);

    // Determine if we are after step 3 (index 2) and haven't shown early result yet
    if (currentQuestionIndex === 2 && !step3ResultShown) {
      // Show loading
      setIsLoading(true);
      addLoadingMessage();
      await new Promise(resolve => setTimeout(resolve, 500));
      // Calculate partial result (using whatever answers we have)
      const partialResult = calculateBreedResult(newAnswers as QuestionnaireAnswers, selectedSpecies);
      removeLoadingMessage();
      addResultMessage(partialResult);
      setIsLoading(false);
      setStep3ResultShown(true);
    }

    // Check if all questions answered (excluding species)
    const isComplete =
      selectedSpecies &&
      newAnswers.kidLevel &&
      newAnswers.spaceScore &&
      newAnswers.allergy &&
      newAnswers.vibe &&
      newAnswers.grooming &&
      newAnswers.activity;

    if (isComplete) {
      // Show loading
      setIsLoading(true);
      addLoadingMessage();
      await new Promise(resolve => setTimeout(resolve, 500));
      const result = calculateBreedResult(newAnswers as QuestionnaireAnswers, selectedSpecies);
      removeLoadingMessage();
      addResultMessage(result);
      setIsLoading(false);
      if (onComplete) onComplete(result);
      if (onResultReady) onResultReady();
    } else {
      // Show loading before next question
      setIsLoading(true);
      addLoadingMessage();
      await new Promise(resolve => setTimeout(resolve, 500));
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      removeLoadingMessage();
      addQuestionMessage(nextIndex);
      setIsLoading(false);
    }
  };

  const isQuestionAnswered = (questionType: 'species' | 'kid' | 'space' | 'allergy' | 'vibe' | 'grooming' | 'activity'): boolean => {
    if (questionType === 'species') return !!selectedSpecies;
    if (questionType === 'kid') return !!answers.kidLevel;
    if (questionType === 'space') return !!answers.spaceScore;
    if (questionType === 'allergy') return !!answers.allergy;
    if (questionType === 'vibe') return !!answers.vibe;
    if (questionType === 'grooming') return !!answers.grooming;
    if (questionType === 'activity') return !!answers.activity;
    return false;
  };

  const renderMessage = (message: ChatMessage) => {
    if (message.type === 'question' && message.question) {
      const isAnswered = isQuestionAnswered(message.question.type);
      const isDisabled = isLoading || isAnswered;

      return (
        <View key={message.id} className="mb-6">
          <View className="bg-gray-100 rounded-3xl rounded-tl-sm p-4 mb-4 max-w-[85%]">
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {message.question.title}
            </Text>
            <Text className="text-sm text-gray-600 leading-5">
              {message.question.description}
            </Text>
          </View>

          {message.question.type === 'space' ? (
            <View className="flex-row gap-3 mb-2">
              {message.question.spaceOptions?.map(score => (
                <TouchableOpacity
                  key={score}
                  onPress={() => handleAnswer(score, score.toString())}
                  disabled={isDisabled}
                  className={`flex-1 aspect-square items-center justify-center rounded-2xl ${
                    answers.spaceScore === score
                      ? 'bg-orange-500'
                      : isDisabled
                        ? 'bg-gray-50'
                        : 'bg-gray-100'
                  }`}
                >
                  <Text
                    className={`text-xl font-bold ${
                      answers.spaceScore === score
                        ? 'text-white'
                        : isDisabled
                          ? 'text-gray-400'
                          : 'text-gray-700'
                    }`}
                  >
                    {score}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className="gap-3">
              {message.question.options?.map(option => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleAnswer(option.value, option.label)}
                  disabled={isDisabled}
                  className={`flex-row items-center justify-between p-4 rounded-2xl border-2 ${
                    getAnswerValue(message.question!.type) === option.value
                      ? 'border-orange-500 bg-orange-50'
                      : isDisabled
                        ? 'border-gray-100 bg-gray-50'
                        : 'border-gray-200 bg-white'
                  }`}
                >
                  <Text
                    className={`text-base font-medium ${
                      isDisabled && getAnswerValue(message.question!.type) !== option.value
                        ? 'text-gray-400'
                        : 'text-gray-900'
                    }`}
                  >
                    {option.label}
                  </Text>
                  <Ionicons
                    name={
                      getAnswerValue(message.question!.type) === option.value
                        ? 'checkmark-circle'
                        : 'ellipse-outline'
                    }
                    size={24}
                    color={
                      getAnswerValue(message.question!.type) === option.value
                        ? '#f97316'
                        : isDisabled
                          ? '#e5e7eb'
                          : '#d1d5db'
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {message.question.type === 'space' && (
            <View className="flex-row justify-between mt-2">
              <Text className="text-xs text-gray-500">1 = Tiny studio</Text>
              <Text className="text-xs text-gray-500">
                5 = Roomy with balcony
              </Text>
            </View>
          )}
        </View>
      );
    }

    if (message.type === 'answer') {
      return (
        <View key={message.id} className="mb-4 items-end">
          <View className="bg-orange-500 rounded-3xl rounded-tr-sm p-4 max-w-[85%]">
            <Text className="text-base font-medium text-white">
              {message.answer}
            </Text>
          </View>
        </View>
      );
    }

    if (message.type === 'loading') {
      return (
        <View key={message.id} className="mb-4">
          <View className="bg-gray-100 rounded-3xl rounded-tl-sm p-4 max-w-[85%]">
            <View className="flex-row items-center gap-2">
              <ActivityIndicator size="small" color="#6b7280" />
              <Text className="text-sm text-gray-600">Thinking...</Text>
            </View>
          </View>
        </View>
      );
    }

    if (message.type === 'result' && message.result) {
      const handleShare = async () => {
        const shareText = `I'm a ${message.result!.name} Recruit! 🐱 ${message.result!.fitScore}% match – ${message.result!.why}`;
        try {
          await Share.share({
            message: shareText,
          });
        } catch (error) {
          console.error('Failed to share:', error);
          Alert.alert('Error', 'Failed to share');
        }
      };

      







      return (
        <View key={message.id} className="mb-6">
          <View className="bg-gray-100 rounded-3xl rounded-tl-sm p-6 mb-4">
            <Text className="text-3xl font-bold text-orange-600 mb-2 text-center">
              {message.result.name} Unlocked! 🎉
            </Text>
            <View className="items-center mb-4">
              <View className="bg-orange-100 px-4 py-2 rounded-full">
                <Text className="text-lg font-semibold text-orange-700">
                  {message.result.fitScore}% Match
                </Text>
              </View>
            </View>
            <View className="bg-gray-50 rounded-2xl p-4 mb-4">
              <Text className="text-base text-gray-900 text-center leading-6">
                {message.result.why}
              </Text>
            </View>
            <View className="flex-row flex-wrap justify-center gap-2 mb-6">
                {message.result.tags
                  .slice()
                  .sort()
                  .map(tag => (
                    <View
                      key={tag}
                      className="bg-orange-100 px-4 py-2 rounded-full"
                    >
                      <Text className="text-sm font-medium text-orange-800">
                        #{tag}
                      </Text>
                    </View>
                  ))}
            </View>

            {/* Action Buttons */}
            <View className="gap-4">
              <TouchableOpacity
                onPress={handleShare}
                className="flex-row items-center justify-center gap-2 bg-orange-500 py-4 rounded-2xl active:bg-orange-600"
              >
                <Ionicons name="copy-outline" size={20} color="#ffffff" />
                <Text className="text-white font-semibold text-base">
                  Copy Share Text
                </Text>
              </TouchableOpacity>


            </View>
          </View>
        </View>
      );
    }

    return null;
  };

  const getAnswerValue = (
    type: 'species' | 'kid' | 'space' | 'allergy' | 'vibe' | 'grooming' | 'activity',
  ): KidLevel | SpaceScore | Allergy | Vibe | Grooming | Activity | PetSpecies | undefined => {
    if (type === 'species') return selectedSpecies;
    if (type === 'kid') return answers.kidLevel;
    if (type === 'space') return answers.spaceScore;
    if (type === 'allergy') return answers.allergy;
    if (type === 'vibe') return answers.vibe;
    if (type === 'grooming') return answers.grooming;
    if (type === 'activity') return answers.activity;
    return undefined;
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      className="flex-1"
      contentContainerClassName="px-6 py-4 pb-32"
      showsVerticalScrollIndicator={false}
    >
      {messages.map(renderMessage)}
    </ScrollView>
  );
}


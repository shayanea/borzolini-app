import {
    Activity,
    Allergy,
    Grooming,
    KidLevel,
    SpaceScore,
    Vibe,
} from '@/features/introduction/types/questionnaire';
import { PetSpecies } from '@/types/pet/pet-enums';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { QuestionData } from '../../hooks/use-companion-questionnaire';

interface QuestionMessageProps {
  question: QuestionData;
  isAnswered: boolean;
  isLoading: boolean;
  currentAnswer:
    | KidLevel
    | SpaceScore
    | Allergy
    | Vibe
    | Grooming
    | Activity
    | PetSpecies
    | undefined;
  onAnswer: (
    value:
      | KidLevel
      | SpaceScore
      | Allergy
      | Vibe
      | Grooming
      | Activity
      | PetSpecies,
    label: string
  ) => void;
}

export function QuestionMessage({
  question,
  isAnswered,
  isLoading,
  currentAnswer,
  onAnswer,
}: QuestionMessageProps) {
  const isDisabled = isLoading || isAnswered;

  return (
    <View className="mb-6">
      <View className="bg-gray-100 rounded-3xl rounded-tl-sm p-4 mb-4 max-w-[85%]">
        <Text className="text-lg font-bold text-white mb-1">
          {question.title}
        </Text>
        <Text className="text-sm text-gray-600 leading-5">
          {question.description}
        </Text>
      </View>

      {question.type === 'space' ? (
        <View className="flex-row gap-3 mb-2">
          {question.spaceOptions?.map(score => (
            <TouchableOpacity
              key={score}
              onPress={() => onAnswer(score, score.toString())}
              disabled={isDisabled}
              className={`flex-1 aspect-square items-center justify-center rounded-2xl ${
                currentAnswer === score
                  ? 'bg-orange-500'
                  : isDisabled
                    ? 'bg-gray-50'
                    : 'bg-gray-100'
              }`}
            >
              <Text
                className={`text-xl font-bold ${
                  currentAnswer === score
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
          {question.options?.map(option => (
            <TouchableOpacity
              key={option.value}
              onPress={() => onAnswer(option.value, option.label)}
              disabled={isDisabled}
              className={`flex-row items-center justify-between p-4 rounded-2xl border-2 ${
                currentAnswer === option.value
                  ? 'border-orange-500 bg-orange-50'
                  : isDisabled
                    ? 'border-gray-100 bg-gray-50'
                    : 'border-gray-200 bg-white'
              }`}
            >
              <Text
                className={`text-base font-medium ${
                  isDisabled && currentAnswer !== option.value
                    ? 'text-gray-400'
                    : 'text-white'
                }`}
              >
                {option.label}
              </Text>
              <Ionicons
                name={
                  currentAnswer === option.value
                    ? 'checkmark-circle'
                    : 'ellipse-outline'
                }
                size={24}
                color={
                  currentAnswer === option.value
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

      {question.type === 'space' && (
        <View className="flex-row justify-between mt-2">
          <Text className="text-xs text-gray-500">1 = Tiny studio</Text>
          <Text className="text-xs text-gray-500">5 = Roomy with balcony</Text>
        </View>
      )}
    </View>
  );
}

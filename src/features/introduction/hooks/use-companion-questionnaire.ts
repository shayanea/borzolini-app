import { useState, useRef, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useBreeds } from '@/services/breeds';
import { calculateBreedResult } from '../utils/calculate-breed';
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
import { PetSpecies } from '@/types/pet/pet-enums';

export interface QuestionData {
  title: string;
  description: string;
  type:
    | 'species'
    | 'kid'
    | 'space'
    | 'allergy'
    | 'vibe'
    | 'grooming'
    | 'activity';
  options?: Array<{
    label: string;
    value: KidLevel | Allergy | Vibe | Grooming | Activity | PetSpecies;
  }>;
  spaceOptions?: SpaceScore[];
}

export interface ChatMessage {
  id: string;
  type: 'question' | 'answer' | 'loading' | 'result';
  content?: string;
  question?: QuestionData;
  answer?: string;
  result?: BreedResult;
  isIntermediate?: boolean;
}

import { QUESTION_SETS } from '../constants/question-sets';

const DEFAULT_QUESTIONS = QUESTION_SETS.lifestyle;

interface UseCompanionQuestionnaireProps {
  onComplete?: (result: BreedResult) => void;
  onResultReady?: () => void;
  questionSet?: 'lifestyle' | 'practical' | 'personality';
}

export function useCompanionQuestionnaire({
  onComplete,
  onResultReady,
  questionSet = 'lifestyle',
}: UseCompanionQuestionnaireProps) {
  const questions = QUESTION_SETS[questionSet] || DEFAULT_QUESTIONS;
  const initialQuestion = questions[0];
  const { data: breedsData, isLoading: breedsLoading } = useBreeds();
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
  const [selectedSpecies, setSelectedSpecies] = useState<
    PetSpecies | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [step3ResultShown, setStep3ResultShown] = useState(false);

  const addQuestionMessage = (index: number) => {
    const question = questions[index];
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

  const addResultMessage = (result: BreedResult, isIntermediate = false) => {
    setMessages(prev => [
      ...prev,
      {
        id: `result-${Date.now()}`,
        type: 'result',
        result,
        isIntermediate,
      },
    ]);
  };

  const handleAnswer = async (
    value:
      | KidLevel
      | SpaceScore
      | Allergy
      | Vibe
      | Grooming
      | Activity
      | PetSpecies,
    label: string
  ) => {
    // Update answers
    const question = questions[currentQuestionIndex];
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
    const isValidStep3 =
      currentQuestionIndex === 2 && !step3ResultShown && breedsData;
    if (isValidStep3) {
      // Show loading
      setIsLoading(true);
      addLoadingMessage();
      await new Promise(resolve => setTimeout(resolve, 500));
      // Calculate partial result (using whatever answers we have)
      const partialResult = calculateBreedResult(
        newAnswers as QuestionnaireAnswers,
        breedsData,
        selectedSpecies
      );
      if (partialResult) {
        removeLoadingMessage();
        addResultMessage(partialResult, true);
        setIsLoading(false);
        setStep3ResultShown(true);
      } else {
        removeLoadingMessage();
        setIsLoading(false);
      }
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

    if (isComplete && breedsData) {
      // Show loading
      setIsLoading(true);
      addLoadingMessage();
      await new Promise(resolve => setTimeout(resolve, 500));
      const result = calculateBreedResult(
        newAnswers as QuestionnaireAnswers,
        breedsData,
        selectedSpecies
      );
      removeLoadingMessage();
      if (result) {
        addResultMessage(result);
        setIsLoading(false);
        if (onComplete) onComplete(result);
        if (onResultReady) onResultReady();
      } else {
        setIsLoading(false);
        Alert.alert(
          'No Match Found',
          "We couldn't find a perfect match based on your answers. Please try adjusting your preferences."
        );
      }
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

  const isQuestionAnswered = (
    questionType:
      | 'species'
      | 'kid'
      | 'space'
      | 'allergy'
      | 'vibe'
      | 'grooming'
      | 'activity'
  ): boolean => {
    if (questionType === 'species') return !!selectedSpecies;
    if (questionType === 'kid') return !!answers.kidLevel;
    if (questionType === 'space') return !!answers.spaceScore;
    if (questionType === 'allergy') return !!answers.allergy;
    if (questionType === 'vibe') return !!answers.vibe;
    if (questionType === 'grooming') return !!answers.grooming;
    if (questionType === 'activity') return !!answers.activity;
    return false;
  };

  const getAnswerValue = (
    type:
      | 'species'
      | 'kid'
      | 'space'
      | 'allergy'
      | 'vibe'
      | 'grooming'
      | 'activity'
  ):
    | KidLevel
    | SpaceScore
    | Allergy
    | Vibe
    | Grooming
    | Activity
    | PetSpecies
    | undefined => {
    if (type === 'species') return selectedSpecies;
    if (type === 'kid') return answers.kidLevel;
    if (type === 'space') return answers.spaceScore;
    if (type === 'allergy') return answers.allergy;
    if (type === 'vibe') return answers.vibe;
    if (type === 'grooming') return answers.grooming;
    if (type === 'activity') return answers.activity;
    return undefined;
  };

  return {
    messages,
    isLoading,
    breedsLoading,
    breedsData,
    scrollViewRef,
    handleAnswer,
    isQuestionAnswered,
    getAnswerValue,
    answers,
  };
}

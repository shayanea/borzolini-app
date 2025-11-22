import type { BreedResult } from '../types/questionnaire';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import {
  ChatMessage,
  useCompanionQuestionnaire,
} from '../hooks/use-companion-questionnaire';
import { QuestionMessage } from './chat-messages/question-message';
import { AnswerMessage } from './chat-messages/answer-message';
import { LoadingMessage } from './chat-messages/loading-message';
import { ResultMessage } from './chat-messages/result-message';

interface CompanionQuestionnaireProps {
  onComplete?: (result: BreedResult) => void;
  onResultReady?: () => void;
}

export function CompanionQuestionnaire({
  onComplete,
  onResultReady,
}: CompanionQuestionnaireProps) {
  const {
    messages,
    isLoading,
    breedsLoading,
    breedsData,
    scrollViewRef,
    handleAnswer,
    isQuestionAnswered,
    getAnswerValue,
  } = useCompanionQuestionnaire({ onComplete, onResultReady });

  const renderMessage = (message: ChatMessage) => {
    if (message.type === 'question' && message.question) {
      return (
        <QuestionMessage
          key={message.id}
          question={message.question}
          isAnswered={isQuestionAnswered(message.question.type)}
          isLoading={isLoading}
          currentAnswer={getAnswerValue(message.question.type)}
          onAnswer={handleAnswer}
        />
      );
    }

    if (message.type === 'answer' && message.answer) {
      return <AnswerMessage key={message.id} answer={message.answer} />;
    }

    if (message.type === 'loading') {
      return <LoadingMessage key={message.id} />;
    }

    if (message.type === 'result' && message.result) {
      return <ResultMessage key={message.id} result={message.result} />;
    }

    return null;
  };

  // Show loading state while breeds are being fetched
  if (breedsLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#f97316" />
        <Text className="text-gray-600 mt-4">Loading breeds data...</Text>
      </View>
    );
  }

  // Show error if breeds failed to load
  if (!breedsData) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-red-600 text-center text-lg font-semibold mb-2">
          Failed to load breeds
        </Text>
        <Text className="text-gray-600 text-center">
          Please check your connection and try again.
        </Text>
      </View>
    );
  }

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

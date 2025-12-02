import { FaqItem } from '@/types/faq';

// Mock data for development
const MOCK_FAQS: FaqItem[] = [
  {
    id: '1',
    question: 'Is chocolate really that bad?',
    answer: 'Yes, chocolate contains theobromine, which dogs cannot metabolize effectively. Even small amounts can cause vomiting, diarrhea, and in severe cases, seizures or heart problems.',
  },
  {
    id: '2',
    question: 'How often should I bathe my dog?',
    answer: 'Generally, dogs should be bathed every 4-6 weeks. However, this depends on their breed, coat type, and activity level. Over-bathing can strip natural oils from their skin.',
  },
  {
    id: '3',
    question: 'Why does my dog eat grass?',
    answer: 'Dogs may eat grass to aid digestion, fulfill a nutritional need, or simply because they like the taste. Occasional grass eating is usually normal, but frequent grazing might indicate a stomach issue.',
  },
];

export const FaqService = {
  // TODO: Replace with actual API call when endpoint is confirmed
  // getAll: () => httpClient.get<FaqItem[]>('/v1/faqs'),
  
  getAll: async (): Promise<FaqItem[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_FAQS;
  }
};

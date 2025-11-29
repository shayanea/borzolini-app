import { PetSpecies } from '@/types/pet/pet-enums';
import type { QuestionData } from '../hooks/use-companion-questionnaire';

export const QUESTION_SETS: Record<string, QuestionData[]> = {
  lifestyle: [
    {
      title: 'What type of buddy?',
      description: 'First things first, who are we looking for?',
      type: 'species',
      options: [
        { label: '🐱 Cat', value: PetSpecies.CAT },
        { label: '🐕 Dog', value: PetSpecies.DOG },
        { label: '🐦 Bird', value: PetSpecies.BIRD },
        { label: '🐰 Rabbit', value: PetSpecies.RABBIT },
      ],
    },
    {
      title: 'Morning Routine',
      description: 'How do you usually start your day?',
      type: 'activity',
      options: [
        { label: '👟 Lacing up for a run', value: 'high' },
        { label: '☕ Slow coffee & book', value: 'medium' },
        { label: '😴 Snooze button champion', value: 'low' },
      ],
    },
    {
      title: 'Weekend Vibe',
      description: "It's Saturday night! What's the plan?",
      type: 'vibe',
      options: [
        { label: '🎉 Hosting a dinner party', value: 'playful' },
        { label: '🎬 Quiet movie night', value: 'independent' },
        { label: '🤗 Cuddle puddle on the couch', value: 'cuddly' },
      ],
    },
    {
      title: 'Living Situation',
      description: 'Where will your new friend be crashing?',
      type: 'space',
      spaceOptions: [1, 2, 3, 4, 5],
    },
    {
      title: 'Mess Tolerance',
      description: 'How do you feel about pet hair and grooming?',
      type: 'grooming',
      options: [
        { label: '✨ Keep it spotless (Low)', value: 'low' },
        { label: '🧹 Weekly tidy is fine', value: 'medium' },
        { label: '💇‍♀️ I love styling them!', value: 'high' },
      ],
    },
    {
      title: 'Household Chaos',
      description: 'Who else lives with you?',
      type: 'kid',
      options: [
        { label: '🧘 Just adults / Zen zone', value: 'none' },
        { label: '👶 Toddlers running wild', value: 'toddlers' },
        { label: '🎒 School kids / Teens', value: 'school' },
      ],
    },
    {
      title: 'Sneeze Factor',
      description: 'Any allergies we need to worry about?',
      type: 'allergy',
      options: [
        { label: '🤧 Yes, big time', value: 'high' },
        { label: '😤 Nope, all good', value: 'none' },
        { label: '🐕 Have other pets', value: 'otherPets' },
      ],
    },
  ],

  practical: [
    {
      title: 'Species Preference',
      description: 'Select the species you are interested in.',
      type: 'species',
      options: [
        { label: 'Cat', value: PetSpecies.CAT },
        { label: 'Dog', value: PetSpecies.DOG },
        { label: 'Small Pet', value: PetSpecies.HAMSTER },
      ],
    },
    {
      title: 'Available Space',
      description: 'Rate your available space from 1 (Tiny) to 5 (Huge).',
      type: 'space',
      spaceOptions: [1, 2, 3, 4, 5],
    },
    {
      title: 'Time for Grooming',
      description: 'How much time can you dedicate to coat care?',
      type: 'grooming',
      options: [
        { label: 'Minimal (Wash & Wear)', value: 'low' },
        { label: 'Moderate (Weekly)', value: 'medium' },
        { label: 'Extensive (Daily)', value: 'high' },
      ],
    },
    {
      title: 'Activity Requirements',
      description: 'How much exercise can you provide?',
      type: 'activity',
      options: [
        { label: 'Low (Indoor/Short walks)', value: 'low' },
        { label: 'Medium (Weekend hikes)', value: 'medium' },
        { label: 'High (Daily running)', value: 'high' },
      ],
    },
    {
      title: 'Household Members',
      description: 'Are there children in the home?',
      type: 'kid',
      options: [
        { label: 'No children', value: 'none' },
        { label: 'Young children (<6)', value: 'toddlers' },
        { label: 'Older children (6+)', value: 'school' },
      ],
    },
    {
      title: 'Allergies',
      description: 'Is anyone in the household allergic?',
      type: 'allergy',
      options: [
        { label: 'Yes, severe', value: 'high' },
        { label: 'No', value: 'none' },
      ],
    },
    {
      title: 'Desired Interaction',
      description: 'What is your preferred interaction style?',
      type: 'vibe',
      options: [
        { label: 'Affectionate', value: 'cuddly' },
        { label: 'Playful', value: 'playful' },
        { label: 'Independent', value: 'independent' },
      ],
    },
  ],

  personality: [
    {
      title: 'Soulmate Search',
      description: 'Who connects with your spirit?',
      type: 'species',
      options: [
        { label: '🐱 Feline Friend', value: PetSpecies.CAT },
        { label: '🐕 Canine Companion', value: PetSpecies.DOG },
        { label: '🦜 Feathered Friend', value: PetSpecies.BIRD },
      ],
    },
    {
      title: 'Affection Style',
      description: 'How do you want to show love?',
      type: 'vibe',
      options: [
        { label: '🤗 Velcro pet (Never leave me)', value: 'cuddly' },
        { label: '🎈 Fun & Games', value: 'playful' },
        { label: '👀 Mutual Respect (Space)', value: 'independent' },
      ],
    },
    {
      title: 'Energy Match',
      description: 'What energy do you bring home?',
      type: 'activity',
      options: [
        { label: '⚡ High Voltage', value: 'high' },
        { label: '🌊 Steady Flow', value: 'medium' },
        { label: '🧘 Zen Master', value: 'low' },
      ],
    },
    {
      title: 'Patience Level',
      description: 'How do you handle messes and training?',
      type: 'grooming', // Mapping patience to grooming as a proxy for "high maintenance" tolerance
      options: [
        { label: '😤 I want easy-peasy', value: 'low' },
        { label: '🙂 I can handle a bit', value: 'medium' },
        { label: '🧘 I have infinite patience', value: 'high' },
      ],
    },
    {
      title: 'Social Circle',
      description: 'Is your home a busy hub?',
      type: 'kid',
      options: [
        { label: '🏰 My quiet castle', value: 'none' },
        { label: '🎪 A bit of a circus', value: 'toddlers' },
        { label: '🏫 Organized chaos', value: 'school' },
      ],
    },
    {
      title: 'Personal Space',
      description: 'How much room can you share?',
      type: 'space',
      spaceOptions: [1, 2, 3, 4, 5],
    },
    {
      title: 'Sensitivities',
      description: 'Any physical sensitivities?',
      type: 'allergy',
      options: [
        { label: '🤧 Sensitive nose/skin', value: 'high' },
        { label: '💪 Tough as nails', value: 'none' },
      ],
    },
  ],
};

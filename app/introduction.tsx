import { IntroductionData, UserType } from '@/features/introduction/types';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useMemo, useState } from 'react';

import type { BreedResult } from '@/features/introduction/types/questionnaire';
import { CompanionQuestionnaire } from '@/features/introduction/components/companion-questionnaire';
import { Ionicons } from '@expo/vector-icons';
import { PetSpecies } from '@/types/pet/pet-enums';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StepFour } from '@/features/introduction/components/step-four';
import { StepOne } from '@/features/introduction/components/step-one';
import { StepThree } from '@/features/introduction/components/step-three';
import { StepTwo } from '@/features/introduction/components/step-two';
import { router } from 'expo-router';

export default function IntroductionScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  const [formData, setFormData] = useState<IntroductionData>({
    userType: null,
    selectedBreeds: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    dateOfBirth: '',
    gender: '',
  });

  // Dynamic total steps logic based on PWA
  const totalSteps = useMemo(() => {
    if (formData.userType === 'pet-owner') {
      return 1;
    }
    if (formData.userType === 'companion-seeker') {
      return 2;
    }
    return 4;
  }, [formData.userType]);

  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  const handleUserTypeSelect = (userType: UserType) => {
    setFormData(prev => ({ ...prev, userType }));
  };

  const handleSpeciesSelect = (species: PetSpecies) => {
    setFormData(prev => ({
      ...prev,
      selectedSpecies: species,
      selectedBreeds: [],
    }));
  };

  const handleBreedToggle = (breed: string) => {
    setFormData(prev => {
      const breeds = prev.selectedBreeds.includes(breed)
        ? prev.selectedBreeds.filter(b => b !== breed)
        : [...prev.selectedBreeds, breed];
      return { ...prev, selectedBreeds: breeds };
    });
  };

  const handleUpdateFormData = (updates: Partial<IntroductionData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    // Redirect pet-owner to auth screen immediately after step 0
    if (formData.userType === 'pet-owner' && currentStep === 0) {
      router.replace('/(auth)/login');
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Completion logic matching PWA
      if (formData.userType === 'pet-adopter') {
        router.replace('/(auth)/register');
      } else {
        router.replace('/(tabs)/home');
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      // Reset questionnaire completion when going back
      if (formData.userType === 'companion-seeker') {
        setQuestionnaireCompleted(false);
      }
    } else {
      router.back();
    }
  };

  const canProceed = useMemo(() => {
    if (currentStep === 0) return !!formData.userType;
    if (formData.userType === 'companion-seeker') {
      if (currentStep === 1) return questionnaireCompleted;
    }
    if (formData.userType === 'pet-adopter') {
      if (currentStep === 1) return !!formData.selectedSpecies;
      if (currentStep === 2) return formData.selectedBreeds.length > 0;
      if (currentStep === 3)
        return !!formData.firstName && !!formData.lastName && !!formData.email;
    }
    return true;
  }, [currentStep, formData, questionnaireCompleted]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="px-6 pt-2 pb-6">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity
            onPress={handleBack}
            className="p-2 -ml-2 active:opacity-70"
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-sm font-medium text-gray-900">
            {currentStep + 1}/{totalSteps}
          </Text>
        </View>

        {/* Progress Bar */}
        <View className="w-full bg-gray-200 rounded-full h-1">
          <View
            className="bg-orange-500 h-1 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </View>
      </View>

      {/* Content */}
      {formData.userType === 'companion-seeker' && currentStep === 1 ? (
        <CompanionQuestionnaire
          onComplete={(result: BreedResult) => {
            // Handle completion - could navigate or show result
            console.log('Questionnaire completed:', result);
          }}
          onResultReady={() => {
            setQuestionnaireCompleted(true);
          }}
        />
      ) : (
        <ScrollView
          contentContainerClassName="flex-grow px-6 pb-32"
          showsVerticalScrollIndicator={false}
        >
          {currentStep === 0 && (
            <StepOne
              selectedUserType={formData.userType}
              onUserTypeSelect={handleUserTypeSelect}
            />
          )}

          {formData.userType === 'pet-adopter' && currentStep === 1 && (
            <StepTwo
              selectedSpecies={formData.selectedSpecies}
              onSpeciesSelect={handleSpeciesSelect}
            />
          )}

          {formData.userType === 'pet-adopter' && currentStep === 2 && (
            <StepThree
              selectedSpecies={formData.selectedSpecies}
              selectedBreeds={formData.selectedBreeds}
              onBreedToggle={handleBreedToggle}
            />
          )}

          {formData.userType === 'pet-adopter' && currentStep === 3 && (
            <StepFour data={formData} onUpdate={handleUpdateFormData} />
          )}
        </ScrollView>
      )}

      {/* Footer */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
        <TouchableOpacity
          onPress={handleNext}
          disabled={!canProceed}
          className={`w-full py-4 rounded-full items-center shadow-lg ${
            canProceed
              ? 'bg-orange-500 shadow-orange-500/30 active:bg-orange-600'
              : 'bg-gray-300 shadow-gray-300/30'
          }`}
        >
          <Text className="text-white font-bold text-base uppercase tracking-wide">
            {currentStep === totalSteps - 1 ? 'Finish' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

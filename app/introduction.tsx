import { IntroductionData, UserType } from '@/features/introduction/types';
import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { CompanionQuestionnaire } from '@/features/introduction/components/companion-questionnaire';
import { IntroductionFooter } from '@/features/introduction/components/introduction-footer';
import { IntroductionHeader } from '@/features/introduction/components/introduction-header';
import { StepFour } from '@/features/introduction/components/step-four';
import { StepOne } from '@/features/introduction/components/step-one';
import { StepThree } from '@/features/introduction/components/step-three';
import { StepTwo } from '@/features/introduction/components/step-two';
import type { BreedResult } from '@/features/introduction/types/questionnaire';
import { PetSpecies } from '@/types/pet/pet-enums';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView
      className="flex-1 bg-[#17171c]"
      edges={['top', 'left', 'right']}
    >
      <IntroductionHeader
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={handleBack}
      />

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
          className="flex-1"
          contentContainerClassName="flex-grow px-4 pb-32"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-grow px-6 pb-32">
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
                selectedBreeds={formData.selectedBreeds}
                onBreedToggle={handleBreedToggle}
              />
            )}

            {formData.userType === 'pet-adopter' && currentStep === 3 && (
              <StepFour data={formData} onUpdate={handleUpdateFormData} />
            )}
          </View>
        </ScrollView>
      )}

      {/* Footer */}
      <IntroductionFooter
        onNext={handleNext}
        canProceed={canProceed}
        isLastStep={currentStep === totalSteps - 1}
      />
    </SafeAreaView>
  );
}

import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { trainingService } from '../services/training.service';
import {
  ActivityDifficulty,
  ChallengeStep,
  ModuleDetailResponse,
  ModuleWithProgress,
  PetSpecies,
  StepWithProgress,
  UserChallengeProgress,
  UserLevel,
  WeeklyChallenge,
} from '../types';
import { ChallengeDetailModal } from './challenge-detail-modal';
import { ChallengeModal } from './challenge-modal';
import { TrainingDetailModal } from './training-detail-modal';
import { TrainingHeader } from './training-header';
import { TrainingModuleCard } from './training-module-card';
import { WeeklyChallengeBanner } from './weekly-challenge-banner';

// Mock data for demo when API is not available
const mockModules: ModuleWithProgress[] = [
  {
    id: '1',
    title: 'Basic Obedience',
    description: 'Sit, Stay, Come, and Heel basics.',
    thumbnail_url: null,
    duration_minutes: 15,
    difficulty: ActivityDifficulty.EASY,
    category: 'obedience',
    species: PetSpecies.DOG,
    is_active: true,
    created_at: '',
    updated_at: '',
    user_progress: {
      id: 'p1',
      user_id: 'u1',
      module_id: '1',
      started_at: '',
      progress_percentage: 60,
      completed_steps: [],
    },
  },
  {
    id: '2',
    title: 'Agility Starter',
    description: 'Introduction to jumps and tunnels.',
    thumbnail_url: null,
    duration_minutes: 20,
    difficulty: ActivityDifficulty.MODERATE,
    category: 'agility',
    species: PetSpecies.DOG,
    is_active: true,
    created_at: '',
    updated_at: '',
    user_progress: {
      id: 'p2',
      user_id: 'u1',
      module_id: '2',
      started_at: '',
      progress_percentage: 25,
      completed_steps: [],
    },
  },
  {
    id: '3',
    title: 'Advanced Tricks',
    description: 'Spin, Play Dead, and Bow.',
    thumbnail_url: null,
    duration_minutes: 25,
    difficulty: ActivityDifficulty.ADVANCED,
    category: 'tricks',
    species: PetSpecies.DOG,
    is_active: true,
    created_at: '',
    updated_at: '',
    user_progress: null,
  },
  {
    id: '4',
    title: 'Leash Mastery',
    description: 'Perfect loose leash walking.',
    thumbnail_url: null,
    duration_minutes: 10,
    difficulty: ActivityDifficulty.EASY,
    category: 'walking',
    species: PetSpecies.DOG,
    is_active: true,
    created_at: '',
    updated_at: '',
    user_progress: null,
  },
];

export function TrainingDashboard() {
  const [modules, setModules] = useState<ModuleWithProgress[]>([]);
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
  const [challenge, setChallenge] = useState<WeeklyChallenge | null>(null);
  const [challengeProgress, setChallengeProgress] =
    useState<UserChallengeProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Modal states
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showChallengeDetailModal, setShowChallengeDetailModal] =
    useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedModuleDetail, setSelectedModuleDetail] =
    useState<ModuleDetailResponse | null>(null);
  const [acceptingChallenge, setAcceptingChallenge] = useState(false);
  const [completingStep, setCompletingStep] = useState<string | null>(null);
  const [completingChallengeStep, setCompletingChallengeStep] = useState<
    string | null
  >(null);

  const fetchData = useCallback(async () => {
    try {
      // Try to fetch from API, fall back to mock data
      const [modulesData, profileData, challengeData] =
        await Promise.allSettled([
          trainingService.getModulesWithProgress(),
          trainingService.getUserProfile(),
          trainingService.getActiveChallenge(),
        ]);

      // Handle modules data - treat empty array as valid response
      if (modulesData.status === 'fulfilled') {
        setModules(modulesData.value);
      } else {
        // Only use mock data if API call failed
        console.warn(
          'Failed to fetch modules, using mock data:',
          modulesData.reason
        );
        setModules(mockModules);
      }

      if (profileData.status === 'fulfilled') {
        setUserLevel(profileData.value.level);
      }

      // Handle challenge data - null is a valid response (no active challenge)
      if (challengeData.status === 'fulfilled') {
        const activeChallenge = challengeData.value;
        setChallenge(activeChallenge);

        // Fetch challenge progress if challenge exists
        if (activeChallenge) {
          try {
            const progress = await trainingService.getChallengeProgress(
              activeChallenge.id
            );
            setChallengeProgress(progress);
          } catch {
            // No progress means challenge not accepted yet
            setChallengeProgress(null);
          }
        } else {
          setChallengeProgress(null);
        }
      }
    } catch (error) {
      console.error('Failed to fetch training data:', error);
      // Fall back to mock data only on unexpected errors
      setModules(mockModules);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  const handleModulePress = async (module: ModuleWithProgress) => {
    try {
      // Start module if not started yet
      if (!module.user_progress) {
        try {
          await trainingService.startModule(module.id);
        } catch (error) {
          console.error('Failed to start module:', error);
        }
      }

      const detail = await trainingService.getModuleById(module.id);
      setSelectedModuleDetail(detail);
    } catch {
      // Use mock detail with the selected module
      setSelectedModuleDetail({
        module,
        steps: [],
        user_progress: module.user_progress,
        final_challenge: null,
      });
    }
    setShowDetailModal(true);
  };

  const handleStepPress = useCallback(
    async (step: StepWithProgress) => {
      if (!selectedModuleDetail) return;

      // Don't allow completing already completed steps
      if (step.is_completed) {
        return;
      }

      const moduleId = selectedModuleDetail.module.id;
      const stepId = step.id;

      setCompletingStep(stepId);
      try {
        await trainingService.completeStep(moduleId, stepId);
        // Refresh module detail to get updated progress
        const updatedDetail = await trainingService.getModuleById(moduleId);
        setSelectedModuleDetail(updatedDetail);
        // Refresh all data to update progress in the list
        await fetchData();
      } catch (error) {
        console.error('Failed to complete step:', error);
      } finally {
        setCompletingStep(null);
      }
    },
    [selectedModuleDetail, fetchData]
  );

  const handleAcceptChallenge = async () => {
    if (!challenge) return;
    setAcceptingChallenge(true);
    try {
      const progress = await trainingService.acceptChallenge(challenge.id);
      setChallengeProgress(progress);
      setShowChallengeModal(false);
      setShowChallengeDetailModal(true);
      await fetchData();
    } catch (error) {
      console.error('Failed to accept challenge:', error);
    } finally {
      setAcceptingChallenge(false);
    }
  };

  const handleChallengeStepPress = useCallback(
    async (step: ChallengeStep) => {
      if (!challenge || !challengeProgress) return;

      // Don't allow completing already completed steps
      if (challengeProgress.completed_steps.includes(step.id)) {
        return;
      }

      const challengeId = challenge.id;
      const stepId = step.id;

      setCompletingChallengeStep(stepId);
      try {
        await trainingService.completeChallengeStep(challengeId, stepId);
        // Refresh challenge progress
        const updatedProgress =
          await trainingService.getChallengeProgress(challengeId);
        setChallengeProgress(updatedProgress);
        // Refresh all data to update progress
        await fetchData();
      } catch (error) {
        console.error('Failed to complete challenge step:', error);
      } finally {
        setCompletingChallengeStep(null);
      }
    },
    [challenge, challengeProgress, fetchData]
  );

  // Split modules into in-progress and upcoming
  const inProgressModules = modules.filter(
    m =>
      m.user_progress &&
      m.user_progress.progress_percentage > 0 &&
      m.user_progress.progress_percentage < 100
  );
  const upcomingModules = modules.filter(
    m => !m.user_progress || m.user_progress.progress_percentage === 0
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#17171c]">
        <ActivityIndicator size="large" color="#9c5cf6" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#17171c]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 py-6"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9c5cf6']}
            tintColor="#9c5cf6"
          />
        }
      >
        <TrainingHeader level={userLevel} />

        <WeeklyChallengeBanner
          challenge={challenge}
          challengeProgress={challengeProgress}
          onStartChallenge={() => {
            if (challengeProgress) {
              setShowChallengeDetailModal(true);
            } else {
              setShowChallengeModal(true);
            }
          }}
        />

        {/* In Progress Section */}
        {inProgressModules.length > 0 && (
          <View className="mb-6">
            <Text className="text-white font-semibold text-lg mb-4">
              In Progress
            </Text>
            {inProgressModules.map(module => (
              <TrainingModuleCard
                key={module.id}
                module={module}
                onPress={() => handleModulePress(module)}
              />
            ))}
          </View>
        )}

        {/* Upcoming Modules Section */}
        {upcomingModules.length > 0 && (
          <View className="mb-6">
            <Text className="text-white font-semibold text-lg mb-4">
              Upcoming Modules
            </Text>
            {upcomingModules.map(module => (
              <TrainingModuleCard
                key={module.id}
                module={module}
                onPress={() => handleModulePress(module)}
              />
            ))}
          </View>
        )}

        {/* Empty state */}
        {modules.length === 0 && !loading && (
          <View className="bg-[#1f1f24] rounded-xl p-8 items-center justify-center shadow-sm">
            <Text className="text-lg font-semibold text-white mb-2">
              No Training Modules
            </Text>
            <Text className="text-[#94a3b8] text-center">
              Check back later for available training modules.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Modals */}
      <ChallengeModal
        visible={showChallengeModal}
        challenge={challenge}
        onClose={() => setShowChallengeModal(false)}
        onAccept={handleAcceptChallenge}
        isAccepting={acceptingChallenge}
      />

      <ChallengeDetailModal
        visible={showChallengeDetailModal}
        challenge={challenge}
        progress={challengeProgress}
        onClose={() => setShowChallengeDetailModal(false)}
        onStepPress={handleChallengeStepPress}
        isCompletingStep={completingChallengeStep !== null}
      />

      <TrainingDetailModal
        visible={showDetailModal}
        moduleDetail={selectedModuleDetail}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedModuleDetail(null);
        }}
        onStepPress={handleStepPress}
        isCompletingStep={completingStep !== null}
      />
    </View>
  );
}

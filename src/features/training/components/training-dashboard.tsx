import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import { ActivityCard } from './activity-card';
import { ActivityDetail } from './activity-detail';
import { trainingService } from '../services/training.service';
import { DailyTrainingAssignment, TrainingActivity } from '../types';

export function TrainingDashboard() {
  const [assignments, setAssignments] = useState<DailyTrainingAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<TrainingActivity | null>(null);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [completing, setCompleting] = useState(false);

  const fetchAssignments = useCallback(async () => {
    try {
      const data = await trainingService.getTodayAssignments();
      setAssignments(data);
    } catch (error) {
      console.error('Failed to fetch training assignments:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAssignments();
    }, [fetchAssignments])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAssignments();
  }, [fetchAssignments]);

  const handleActivityPress = (assignment: DailyTrainingAssignment) => {
    if (!assignment.is_completed) {
      setSelectedActivity(assignment.activity);
      setSelectedAssignmentId(assignment.id);
    }
  };

  const handleComplete = async (notes?: string) => {
    if (!selectedAssignmentId) return;

    try {
      setCompleting(true);
      await trainingService.completeAssignment(selectedAssignmentId, { notes });
      setSelectedActivity(null);
      setSelectedAssignmentId(null);
      fetchAssignments();
    } catch (error) {
      console.error('Failed to complete assignment:', error);
    } finally {
      setCompleting(false);
    }
  };

  const pendingAssignments = assignments.filter(a => !a.is_completed);
  const completedAssignments = assignments.filter(a => a.is_completed);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#fb8500" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 py-6"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#fb8500']} />
        }
      >
        <View className="mb-6">
          <Text className="text-3xl font-bold text-secondary-900 mb-2">
            Today's Training
          </Text>
          <Text className="text-secondary-600">
            {pendingAssignments.length > 0 
              ? `You have ${pendingAssignments.length} activities pending` 
              : "All done for today! Great job!"}
          </Text>
        </View>

        {pendingAssignments.length > 0 && (
          <View className="mb-8">
            <Text className="text-lg font-semibold text-secondary-900 mb-4">
              To Do
            </Text>
            {pendingAssignments.map((assignment) => (
              <ActivityCard
                key={assignment.id}
                activity={assignment.activity}
                onPress={() => handleActivityPress(assignment)}
              />
            ))}
          </View>
        )}

        {completedAssignments.length > 0 && (
          <View>
            <Text className="text-lg font-semibold text-secondary-900 mb-4">
              Completed
            </Text>
            {completedAssignments.map((assignment) => (
              <ActivityCard
                key={assignment.id}
                activity={assignment.activity}
                onPress={() => {}} // Already completed
                isCompleted
              />
            ))}
          </View>
        )}

        {assignments.length === 0 && !loading && (
          <View className="bg-white rounded-xl p-8 items-center justify-center shadow-sm">
            <Text className="text-lg font-semibold text-secondary-900 mb-2">
              No Assignments Yet
            </Text>
            <Text className="text-secondary-600 text-center">
              Check back later for your daily training plan.
            </Text>
          </View>
        )}
      </ScrollView>

      <ActivityDetail
        activity={selectedActivity}
        visible={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        onComplete={handleComplete}
        isCompleting={completing}
      />
    </View>
  );
}

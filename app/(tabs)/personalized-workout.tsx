import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Platform, StyleSheet, ViewStyle, Modal, Alert, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Plus, X, ChevronDown, Clock, Dumbbell } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const WORKOUT_DAYS = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun'
];

const EXERCISE_TYPES = [
  'Strength',
  'Cardio',
  'Flexibility',
  'Recovery',
  'Physio',
  'HIIT',
  'Yoga'
];

interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  day: string;
  type: string;
  duration: string;
  notes: string;
  isDone: boolean;
}

interface WorkoutData {
  userId: string;
  workoutName: string;
  selectedDays: string[];
  exercises: Exercise[];
  createdAt: Date;
}

const PersonalizedWorkoutScreen: React.FC = () => {
  const { user } = useAuth();
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showDayModal, setShowDayModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedWorkoutDays, setSelectedWorkoutDays] = useState<string[]>([]);

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      sets: '',
      reps: '',
      day: '',
      type: '',
      duration: '',
      notes: '',
      isDone: false,
    };
    setExercises([...exercises, newExercise]);
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  const updateExercise = (id: string, field: keyof Exercise, value: string) => {
    setExercises(exercises.map(exercise => 
      exercise.id === id ? { ...exercise, [field]: value } : exercise
    ));
  };

  const handleToggleDone = (id: string) => {
    setExercises(exercises.map(exercise =>
      exercise.id === id ? { ...exercise, isDone: !exercise.isDone } : exercise
    ));
  };

  const handleSelectWorkoutDay = (day: string) => {
    setSelectedWorkoutDays(prevDays =>
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  const renderDaySelector = (exercise: Exercise) => (
    <TouchableOpacity
      style={styles.dropdownButton}
      onPress={() => {
        setSelectedExerciseId(exercise.id);
        setShowDayModal(true);
      }}
    >
      <Text style={styles.dropdownButtonText}>
        {exercise.day || 'Select Day'}
      </Text>
      <ChevronDown size={16} color={Colors.dark.text + '80'} />
    </TouchableOpacity>
  );

  const renderTypeSelector = (exercise: Exercise) => (
    <TouchableOpacity
      style={styles.dropdownButton}
      onPress={() => {
        setSelectedExerciseId(exercise.id);
        setShowTypeModal(true);
      }}
    >
      <Text style={styles.dropdownButtonText}>
        {exercise.type || 'Select Type'}
      </Text>
      <ChevronDown size={16} color={Colors.dark.text + '80'} />
    </TouchableOpacity>
  );

  const validateWorkout = (): boolean => {
    if (!workoutName.trim()) {
      Alert.alert('Error', 'Please enter a workout name');
      return false;
    }

    if (selectedWorkoutDays.length === 0) {
      Alert.alert('Error', 'Please select at least one day for the workout');
      return false;
    }

    if (exercises.length === 0) {
      Alert.alert('Error', 'Please add at least one exercise');
      return false;
    }

    for (const exercise of exercises) {
      if (!exercise.name.trim()) {
        Alert.alert('Error', 'Please enter a name for all exercises');
        return false;
      }
      if (!exercise.day) {
        Alert.alert('Error', 'Please select a day for all exercises');
        return false;
      }
      if (!exercise.type) {
        Alert.alert('Error', 'Please select a type for all exercises');
        return false;
      }
    }

    return true;
  };

  const handleSaveWorkout = async () => {
    if (!validateWorkout()) {
      return;
    }

    if (!user?.id) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    setIsSaving(true);

    try {
      const workoutData: WorkoutData = {
        userId: user.id,
        workoutName: workoutName.trim(),
        selectedDays: selectedWorkoutDays,
        exercises: exercises.map(exercise => ({
          ...exercise,
          name: exercise.name.trim(),
          sets: exercise.sets.trim(),
          reps: exercise.reps.trim(),
          duration: exercise.duration.trim(),
          notes: exercise.notes.trim(),
        })),
        createdAt: new Date(),
      };

      const response = await axios.post('/api/workouts', workoutData);

      if (response.status === 201) {
        Alert.alert(
          'Success',
          'Workout saved successfully',
          [
            {
              text: 'OK',
              onPress: () => router.back(),
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error saving workout:', error);
      Alert.alert(
        'Error',
        'Failed to save workout. Please try again.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.dark.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Personalized Workout</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Workout Name</Text>
          <TextInput
            style={styles.input}
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Enter workout name"
            placeholderTextColor={Colors.dark.text + '80'}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Days</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysContainer}>
            {WORKOUT_DAYS.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayButton,
                  selectedWorkoutDays.includes(day) && styles.selectedDayButton,
                ]}
                onPress={() => handleSelectWorkoutDay(day)}
              >
                <Text style={[
                  styles.dayButtonText,
                  selectedWorkoutDays.includes(day) && styles.selectedDayButtonText,
                ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.exercisesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exercises</Text>
            <TouchableOpacity style={styles.addButton} onPress={addExercise}>
              <Plus size={16} color={Colors.dark.text} />
              <Text style={styles.addButtonText}>Add Exercise</Text>
            </TouchableOpacity>
          </View>

          {exercises.map((exercise) => (
            <View key={exercise.id} style={styles.exerciseCard}>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeExercise(exercise.id)}
              >
                <X size={16} color={Colors.dark.text + '80'} />
              </TouchableOpacity>

              {exercise.isDone ? (
                <TouchableOpacity 
                  style={styles.exerciseSummaryCard} 
                  onPress={() => handleToggleDone(exercise.id)}
                >
                  <Text style={styles.exerciseSummaryName}>{exercise.name}</Text>
                  <View style={styles.exerciseSummaryDetails}>
                    <Dumbbell size={14} color={Colors.dark.text + '80'} style={styles.exerciseSummaryIcon} />
                    <Text style={styles.exerciseSummaryText}>{exercise.type}</Text>
                    {exercise.sets && exercise.reps && (
                      <>
                        <View style={styles.detailSeparator} />
                        <Text style={styles.exerciseSummaryText}>{exercise.sets} x {exercise.reps}</Text>
                      </>
                    )}
                    {exercise.duration && !exercise.sets && !exercise.reps && (
                       <>
                         <View style={styles.detailSeparator} />
                         <Clock size={14} color={Colors.dark.text + '80'} style={styles.exerciseSummaryIcon} />
                         <Text style={styles.exerciseSummaryText}>{exercise.duration} min</Text>
                       </>
                    )}
                  </View>
                  {exercise.notes.trim() !== '' && (
                    <Text style={styles.exerciseNotesSummary}>{exercise.notes}</Text>
                  )}
                </TouchableOpacity>
              ) : (
                <View style={styles.exerciseInputs}>
                  <View style={styles.inputGroupCompact}>
                    <Text style={styles.labelCompact}>Exercise Name</Text>
                    <TextInput
                      style={styles.inputCompact}
                      value={exercise.name}
                      onChangeText={(value) => updateExercise(exercise.id, 'name', value)}
                      placeholder="Enter exercise name"
                      placeholderTextColor={Colors.dark.text + '80'}
                    />
                  </View>

                  <View style={styles.rowContainerCompact}>
                    <View style={[styles.inputGroupCompact, { flex: 1, marginRight: Layout.spacing.s }]}>
                      <Text style={styles.labelCompact}>Day</Text>
                      {renderDaySelector(exercise)}
                    </View>

                    <View style={[styles.inputGroupCompact, { flex: 1 }]}>
                      <Text style={styles.labelCompact}>Type</Text>
                      {renderTypeSelector(exercise)}
                    </View>
                  </View>

                  <View style={styles.rowContainerCompact}>
                    <View style={[styles.inputGroupCompact, { flex: 1, marginRight: Layout.spacing.s }]}>
                      <Text style={styles.labelCompact}>Sets</Text>
                      <TextInput
                        style={[styles.inputCompact, styles.smallInputCompact]}
                        value={exercise.sets}
                        onChangeText={(value) => updateExercise(exercise.id, 'sets', value)}
                        placeholder="3"
                        placeholderTextColor={Colors.dark.text + '80'}
                        keyboardType="numeric"
                      />
                    </View>

                    <View style={[styles.inputGroupCompact, { flex: 1, marginRight: Layout.spacing.s }]}>
                      <Text style={styles.labelCompact}>Reps</Text>
                      <TextInput
                        style={[styles.inputCompact, styles.smallInputCompact]}
                        value={exercise.reps}
                        onChangeText={(value) => updateExercise(exercise.id, 'reps', value)}
                        placeholder="12"
                        placeholderTextColor={Colors.dark.text + '80'}
                        keyboardType="numeric"
                      />
                    </View>

                    <View style={[styles.inputGroupCompact, { flex: 1 }]}>
                      <Text style={styles.labelCompact}>Duration (min)</Text>
                      <TextInput
                        style={[styles.inputCompact, styles.smallInputCompact]}
                        value={exercise.duration}
                        onChangeText={(value) => updateExercise(exercise.id, 'duration', value)}
                        placeholder="30"
                        placeholderTextColor={Colors.dark.text + '80'}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroupCompact}>
                    <Text style={styles.labelCompact}>Notes</Text>
                    <TextInput
                      style={[styles.inputCompact, styles.notesInputCompact]}
                      value={exercise.notes}
                      onChangeText={(value) => updateExercise(exercise.id, 'notes', value)}
                      placeholder="Add any additional notes or instructions"
                      placeholderTextColor={Colors.dark.text + '80'}
                      multiline
                      numberOfLines={2}
                    />
                  </View>

                  <TouchableOpacity 
                    style={styles.doneButton}
                    onPress={() => handleToggleDone(exercise.id)}
                  >
                    <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
        onPress={handleSaveWorkout}
        disabled={isSaving}
      >
        <Text style={styles.saveButtonText}>
          {isSaving ? 'Saving...' : 'Save Workout'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showDayModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDayModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Day</Text>
              <TouchableOpacity onPress={() => setShowDayModal(false)}>
                <X size={24} color={Colors.dark.text} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {WORKOUT_DAYS.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={styles.modalItem}
                  onPress={() => {
                    if (selectedExerciseId) {
                      updateExercise(selectedExerciseId, 'day', day);
                    }
                    setShowDayModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{day}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showTypeModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTypeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Type</Text>
              <TouchableOpacity onPress={() => setShowTypeModal(false)}>
                <X size={24} color={Colors.dark.text} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {EXERCISE_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={styles.modalItem}
                  onPress={() => {
                    if (selectedExerciseId) {
                      updateExercise(selectedExerciseId, 'type', type);
                    }
                    setShowTypeModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: Layout.spacing.m,
  },
  backButton: {
    marginRight: Layout.spacing.m,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.dark.text,
  },
  content: {
    flex: 1,
    padding: Layout.spacing.l,
  },
  inputGroup: {
    marginBottom: Layout.spacing.m,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.text + '99',
    marginBottom: Layout.spacing.xs,
  },
  input: {
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    color: Colors.dark.text,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  smallInput: {
    width: 100,
  },
  exercisesSection: {
    marginTop: Layout.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: Layout.spacing.m,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.dark.text,
  },
  addButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.dark.accent,
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.medium,
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: Colors.dark.text,
    marginLeft: Layout.spacing.xs,
  },
  exerciseCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    marginBottom: Layout.spacing.s,
  },
  removeButton: {
    position: 'absolute' as const,
    top: Layout.spacing.s,
    right: Layout.spacing.s,
    zIndex: 1,
  },
  exerciseInputs: {
    marginTop: Layout.spacing.m,
  },
  rowContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: Layout.spacing.s,
  },
  dropdownButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
  },
  dropdownButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text,
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: Colors.dark.accent,
    margin: Layout.spacing.l,
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    alignItems: 'center' as const,
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.dark.text,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.dark.card,
    borderTopLeftRadius: Layout.borderRadius.large,
    borderTopRightRadius: Layout.borderRadius.large,
    padding: Layout.spacing.l,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: Layout.spacing.m,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.dark.text,
  },
  modalItem: {
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  modalItemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.dark.text,
  },

  // Compact Styles
  inputGroupCompact: {
    marginBottom: Layout.spacing.s,
  },
  labelCompact: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.dark.text + '99',
    marginBottom: Layout.spacing.xs,
  },
  inputCompact: {
    backgroundColor: Colors.dark.background,
    borderRadius: Layout.borderRadius.small,
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.s,
    color: Colors.dark.text,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  smallInputCompact: {
    width: 60,
  },
  rowContainerCompact: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: Layout.spacing.s,
  },
  notesInputCompact: {
    height: 60,
    textAlignVertical: 'top',
  },
  doneButton: {
    backgroundColor: Colors.dark.accent,
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.s,
    borderRadius: Layout.borderRadius.medium,
    marginTop: Layout.spacing.s,
    alignSelf: 'flex-end',
  },
  doneButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: Colors.dark.text,
  },
  exerciseSummaryCard: {
    paddingVertical: Layout.spacing.s,
  },
  exerciseSummaryName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xs,
  },
  exerciseSummaryDetails: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  exerciseSummaryIcon: {
    marginRight: Layout.spacing.xs,
  },
  exerciseSummaryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + '99',
  },
  detailSeparator: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.dark.text + '40',
    marginHorizontal: Layout.spacing.xs,
  },
  exerciseNotesSummary: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text + '80',
    marginTop: Layout.spacing.xs,
  },
  daysContainer: {
    flexDirection: 'row',
    paddingVertical: Layout.spacing.xs,
  },
  dayButton: {
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    marginRight: Layout.spacing.s,
  },
  selectedDayButton: {
    backgroundColor: Colors.dark.accent,
  },
  dayButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text,
  },
  selectedDayButtonText: {
    color: Colors.dark.text,
  },
});

export default PersonalizedWorkoutScreen; 
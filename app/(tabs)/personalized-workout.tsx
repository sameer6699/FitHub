import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Platform, StyleSheet, ViewStyle, Modal, Alert, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Plus, X, ChevronDown, Clock, Dumbbell } from 'lucide-react-native';
import { router } from 'expo-router';
import Layout from '@/constants/Layout';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
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
  const { colors } = useTheme();
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
      <ChevronDown size={16} color={colors.text + '80'} />
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
      <ChevronDown size={16} color={colors.text + '80'} />
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colors.background === '#FFFFFF' ? 'dark' : 'light'} />
      
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Create Personalized Workout</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text + '99' }]}>Workout Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="Enter workout name"
            placeholderTextColor={colors.text + '80'}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text + '99' }]}>Days</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysContainer}>
            {WORKOUT_DAYS.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayButton,
                  { backgroundColor: colors.card },
                  selectedWorkoutDays.includes(day) && { backgroundColor: colors.accent },
                ]}
                onPress={() => handleSelectWorkoutDay(day)}
              >
                <Text style={[
                  styles.dayButtonText,
                  { color: colors.text },
                  selectedWorkoutDays.includes(day) && { color: colors.text },
                ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.exercisesSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Exercises</Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.accent }]} onPress={addExercise}>
              <Plus size={16} color={colors.text} />
              <Text style={[styles.addButtonText, { color: colors.text }]}>Add Exercise</Text>
            </TouchableOpacity>
          </View>

          {exercises.map((exercise) => (
            <View key={exercise.id} style={[styles.exerciseCard, { backgroundColor: colors.card }]}>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeExercise(exercise.id)}
              >
                <X size={16} color={colors.text + '80'} />
              </TouchableOpacity>

              {exercise.isDone ? (
                <TouchableOpacity 
                  style={styles.exerciseSummaryCard} 
                  onPress={() => handleToggleDone(exercise.id)}
                >
                  <Text style={[styles.exerciseSummaryName, { color: colors.text }]}>{exercise.name}</Text>
                  <View style={styles.exerciseSummaryDetails}>
                    <Dumbbell size={14} color={colors.text + '80'} style={styles.exerciseSummaryIcon} />
                    <Text style={[styles.exerciseSummaryText, { color: colors.text + '99' }]}>{exercise.type}</Text>
                    {exercise.sets && exercise.reps && (
                      <>
                        <View style={[styles.detailSeparator, { backgroundColor: colors.text + '40' }]} />
                        <Text style={[styles.exerciseSummaryText, { color: colors.text + '99' }]}>{exercise.sets} x {exercise.reps}</Text>
                      </>
                    )}
                    {exercise.duration && !exercise.sets && !exercise.reps && (
                       <>
                         <View style={[styles.detailSeparator, { backgroundColor: colors.text + '40' }]} />
                         <Clock size={14} color={colors.text + '80'} style={styles.exerciseSummaryIcon} />
                         <Text style={[styles.exerciseSummaryText, { color: colors.text + '99' }]}>{exercise.duration} min</Text>
                       </>
                    )}
                  </View>
                  {exercise.notes.trim() !== '' && (
                    <Text style={[styles.exerciseNotesSummary, { color: colors.text + '80' }]}>{exercise.notes}</Text>
                  )}
                </TouchableOpacity>
              ) : (
                <View style={styles.exerciseInputs}>
                  <View style={styles.inputGroupCompact}>
                    <Text style={[styles.labelCompact, { color: colors.text + '99' }]}>Exercise Name</Text>
                    <TextInput
                      style={[styles.inputCompact, { backgroundColor: colors.background, color: colors.text }]}
                      value={exercise.name}
                      onChangeText={(value) => updateExercise(exercise.id, 'name', value)}
                      placeholder="Enter exercise name"
                      placeholderTextColor={colors.text + '80'}
                    />
                  </View>

                  <View style={styles.rowContainerCompact}>
                    <View style={[styles.inputGroupCompact, { flex: 1, marginRight: Layout.spacing.s }]}>
                      <Text style={[styles.labelCompact, { color: colors.text + '99' }]}>Day</Text>
                      {renderDaySelector(exercise)}
                    </View>

                    <View style={[styles.inputGroupCompact, { flex: 1 }]}>
                      <Text style={[styles.labelCompact, { color: colors.text + '99' }]}>Type</Text>
                      {renderTypeSelector(exercise)}
                    </View>
                  </View>

                  <View style={styles.rowContainerCompact}>
                    <View style={[styles.inputGroupCompact, { flex: 1, marginRight: Layout.spacing.s }]}>
                      <Text style={[styles.labelCompact, { color: colors.text + '99' }]}>Sets</Text>
                      <TextInput
                        style={[styles.inputCompact, styles.smallInputCompact, { backgroundColor: colors.background, color: colors.text }]}
                        value={exercise.sets}
                        onChangeText={(value) => updateExercise(exercise.id, 'sets', value)}
                        placeholder="3"
                        placeholderTextColor={colors.text + '80'}
                        keyboardType="numeric"
                      />
                    </View>

                    <View style={[styles.inputGroupCompact, { flex: 1, marginRight: Layout.spacing.s }]}>
                      <Text style={[styles.labelCompact, { color: colors.text + '99' }]}>Reps</Text>
                      <TextInput
                        style={[styles.inputCompact, styles.smallInputCompact, { backgroundColor: colors.background, color: colors.text }]}
                        value={exercise.reps}
                        onChangeText={(value) => updateExercise(exercise.id, 'reps', value)}
                        placeholder="12"
                        placeholderTextColor={colors.text + '80'}
                        keyboardType="numeric"
                      />
                    </View>

                    <View style={[styles.inputGroupCompact, { flex: 1 }]}>
                      <Text style={[styles.labelCompact, { color: colors.text + '99' }]}>Duration (min)</Text>
                      <TextInput
                        style={[styles.inputCompact, styles.smallInputCompact, { backgroundColor: colors.background, color: colors.text }]}
                        value={exercise.duration}
                        onChangeText={(value) => updateExercise(exercise.id, 'duration', value)}
                        placeholder="30"
                        placeholderTextColor={colors.text + '80'}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroupCompact}>
                    <Text style={[styles.labelCompact, { color: colors.text + '99' }]}>Notes</Text>
                    <TextInput
                      style={[styles.inputCompact, styles.notesInputCompact, { backgroundColor: colors.background, color: colors.text }]}
                      value={exercise.notes}
                      onChangeText={(value) => updateExercise(exercise.id, 'notes', value)}
                      placeholder="Add any additional notes or instructions"
                      placeholderTextColor={colors.text + '80'}
                      multiline
                      numberOfLines={2}
                    />
                  </View>

                  <TouchableOpacity 
                    style={[styles.doneButton, { backgroundColor: colors.accent }]}
                    onPress={() => handleToggleDone(exercise.id)}
                  >
                    <Text style={[styles.doneButtonText, { color: colors.text }]}>Done</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={[styles.saveButton, { backgroundColor: colors.accent }, isSaving && styles.saveButtonDisabled]}
        onPress={handleSaveWorkout}
        disabled={isSaving}
      >
        <Text style={[styles.saveButtonText, { color: colors.text }]}>
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
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Select Day</Text>
              <TouchableOpacity onPress={() => setShowDayModal(false)}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {WORKOUT_DAYS.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[styles.modalItem, { borderBottomColor: colors.text + '20' }]}
                  onPress={() => {
                    if (selectedExerciseId) {
                      updateExercise(selectedExerciseId, 'day', day);
                    }
                    setShowDayModal(false);
                  }}
                >
                  <Text style={[styles.modalItemText, { color: colors.text }]}>{day}</Text>
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
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Select Type</Text>
              <TouchableOpacity onPress={() => setShowTypeModal(false)}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {EXERCISE_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.modalItem, { borderBottomColor: colors.text + '20' }]}
                  onPress={() => {
                    if (selectedExerciseId) {
                      updateExercise(selectedExerciseId, 'type', type);
                    }
                    setShowTypeModal(false);
                  }}
                >
                  <Text style={[styles.modalItemText, { color: colors.text }]}>{type}</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: Layout.spacing.xs,
  },
  input: {
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.medium,
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    marginLeft: Layout.spacing.xs,
  },
  exerciseCard: {
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    marginBottom: Layout.spacing.s,
  },
  removeButton: {
    position: 'absolute',
    top: Layout.spacing.s,
    right: Layout.spacing.s,
    zIndex: 1,
  },
  exerciseInputs: {
    marginTop: Layout.spacing.m,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.s,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Layout.borderRadius.medium,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
  },
  dropdownButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    margin: Layout.spacing.l,
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
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
    borderTopLeftRadius: Layout.borderRadius.large,
    borderTopRightRadius: Layout.borderRadius.large,
    padding: Layout.spacing.l,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  modalItem: {
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  inputGroupCompact: {
    marginBottom: Layout.spacing.s,
  },
  labelCompact: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginBottom: Layout.spacing.xs,
  },
  inputCompact: {
    borderRadius: Layout.borderRadius.small,
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.s,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  smallInputCompact: {
    width: 60,
  },
  rowContainerCompact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.s,
  },
  notesInputCompact: {
    height: 60,
    textAlignVertical: 'top',
  },
  doneButton: {
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.s,
    borderRadius: Layout.borderRadius.medium,
    marginTop: Layout.spacing.s,
    alignSelf: 'flex-end',
  },
  doneButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  exerciseSummaryCard: {
    paddingVertical: Layout.spacing.s,
  },
  exerciseSummaryName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: Layout.spacing.xs,
  },
  exerciseSummaryDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseSummaryIcon: {
    marginRight: Layout.spacing.xs,
  },
  exerciseSummaryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  detailSeparator: {
    width: 1,
    height: '100%',
    marginHorizontal: Layout.spacing.xs,
  },
  exerciseNotesSummary: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: Layout.spacing.xs,
  },
  daysContainer: {
    flexDirection: 'row',
    paddingVertical: Layout.spacing.xs,
  },
  dayButton: {
    borderRadius: Layout.borderRadius.medium,
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    marginRight: Layout.spacing.s,
  },
  dayButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});

export default PersonalizedWorkoutScreen; 
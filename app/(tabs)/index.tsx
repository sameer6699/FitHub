import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Calendar, TrendingUp, Clock, Heart, ArrowRight, Dumbbell, Calendar as CalendarIcon, Utensils, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useAuth } from '@/context/AuthContext';

// Mock data for upcoming appointments
const upcomingAppointments = [
  { id: 1, type: 'Physiotherapy', time: '10:00 AM', date: '2024-03-20', therapist: 'Dr. Sarah Johnson' },
  { id: 2, type: 'Massage Therapy', time: '2:30 PM', date: '2024-03-21', therapist: 'Mike Wilson' },
];

// Mock data for workout plan
const workoutPlan = {
  currentWeek: 'Week 3 of 12',
  nextWorkout: {
    type: 'Upper Body Strength',
    exercises: ['Bench Press', 'Shoulder Press', 'Tricep Dips'],
    duration: '45 minutes',
  },
};

// Mock data for diet analytics
const dietAnalytics = {
  dailyCalories: 1850,
  targetCalories: 2000,
  macros: {
    protein: 120,
    carbs: 180,
    fats: 65,
  },
  waterIntake: 1.8, // liters
  targetWater: 2.5, // liters
};

export default function AnalyticsScreen() {
  const { user } = useAuth();
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.greeting}>
          <Text style={styles.welcomeText}>
            Hello, <Text style={styles.nameText}>{user?.name}</Text>
          </Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Heart size={20} color={Colors.dark.accent} />
            </View>
            <Text style={styles.statValue}>72 bpm</Text>
            <Text style={styles.statLabel}>Avg. Heart Rate</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <TrendingUp size={20} color={Colors.dark.accent} />
            </View>
            <Text style={styles.statValue}>5.4k</Text>
            <Text style={styles.statLabel}>Steps Today</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Calendar size={20} color={Colors.dark.accent} />
            </View>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Active Days</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Clock size={20} color={Colors.dark.accent} />
            </View>
            <Text style={styles.statValue}>45m</Text>
            <Text style={styles.statLabel}>Workout Time</Text>
          </View>
        </View>

        {/* Upcoming Appointments Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ArrowRight size={16} color={Colors.dark.accent} />
            </TouchableOpacity>
          </View>
          
          {upcomingAppointments.map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentIcon}>
                <CalendarIcon size={24} color={Colors.dark.accent} />
              </View>
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentType}>{appointment.type}</Text>
                <Text style={styles.appointmentDetails}>
                  {appointment.time} • {appointment.date}
                </Text>
                <Text style={styles.appointmentTherapist}>{appointment.therapist}</Text>
              </View>
              <ChevronRight size={20} color={Colors.dark.text + '80'} />
            </View>
          ))}
        </View>

        {/* Workout Plan Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Current Workout Plan</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View Plan</Text>
              <ArrowRight size={16} color={Colors.dark.accent} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.workoutPlanCard}>
            <Text style={styles.workoutPlanProgress}>{workoutPlan.currentWeek}</Text>
            <View style={styles.nextWorkout}>
              <Text style={styles.nextWorkoutTitle}>Next Workout</Text>
              <Text style={styles.nextWorkoutType}>{workoutPlan.nextWorkout.type}</Text>
              <View style={styles.exerciseList}>
                {workoutPlan.nextWorkout.exercises.map((exercise, index) => (
                  <Text key={index} style={styles.exerciseItem}>• {exercise}</Text>
                ))}
              </View>
              <Text style={styles.workoutDuration}>{workoutPlan.nextWorkout.duration}</Text>
            </View>
          </View>
        </View>

        {/* Diet Analytics Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Diet Analytics</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View Details</Text>
              <ArrowRight size={16} color={Colors.dark.accent} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.dietCard}>
            <View style={styles.calorieSection}>
              <Text style={styles.calorieTitle}>Daily Calories</Text>
              <Text style={styles.calorieValue}>{dietAnalytics.dailyCalories}</Text>
              <Text style={styles.calorieTarget}>Target: {dietAnalytics.targetCalories}</Text>
            </View>
            
            <View style={styles.macrosSection}>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{dietAnalytics.macros.protein}g</Text>
                <Text style={styles.macroLabel}>Protein</Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{dietAnalytics.macros.carbs}g</Text>
                <Text style={styles.macroLabel}>Carbs</Text>
              </View>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{dietAnalytics.macros.fats}g</Text>
                <Text style={styles.macroLabel}>Fats</Text>
              </View>
            </View>
            
            <View style={styles.waterSection}>
              <View style={styles.waterIcon}>
                <Utensils size={20} color={Colors.dark.accent} />
              </View>
              <View style={styles.waterInfo}>
                <Text style={styles.waterTitle}>Water Intake</Text>
                <Text style={styles.waterValue}>{dietAnalytics.waterIntake}L / {dietAnalytics.targetWater}L</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  greeting: {
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.l,
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.dark.text + '99',
  },
  nameText: {
    fontFamily: 'Inter-Bold',
    color: Colors.dark.text,
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + '80',
    marginTop: Layout.spacing.xs,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Layout.spacing.l - Layout.spacing.xs,
    marginBottom: Layout.spacing.l,
  },
  statCard: {
    width: (Layout.window.width - Layout.spacing.l * 2 - Layout.spacing.xs * 2) / 2,
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    margin: Layout.spacing.xs,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.accent + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xs,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + '80',
  },
  section: {
    paddingHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.dark.text,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.accent,
    marginRight: Layout.spacing.xs,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    marginBottom: Layout.spacing.s,
  },
  appointmentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.dark.accent + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xs,
  },
  appointmentDetails: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + '80',
    marginBottom: Layout.spacing.xs,
  },
  appointmentTherapist: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.accent,
  },
  workoutPlanCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.l,
  },
  workoutPlanProgress: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.accent,
    marginBottom: Layout.spacing.m,
  },
  nextWorkout: {
    marginTop: Layout.spacing.s,
  },
  nextWorkoutTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + '80',
    marginBottom: Layout.spacing.xs,
  },
  nextWorkoutType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.m,
  },
  exerciseList: {
    marginBottom: Layout.spacing.m,
  },
  exerciseItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + '99',
    marginBottom: Layout.spacing.xs,
  },
  workoutDuration: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.accent,
  },
  dietCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.l,
  },
  calorieSection: {
    marginBottom: Layout.spacing.l,
  },
  calorieTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + '80',
    marginBottom: Layout.spacing.xs,
  },
  calorieValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xs,
  },
  calorieTarget: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + '80',
  },
  macrosSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.l,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xs,
  },
  macroLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text + '80',
  },
  waterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.accent + '20',
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
  },
  waterIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.accent + '40',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  waterInfo: {
    flex: 1,
  },
  waterTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xs,
  },
  waterValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.dark.accent,
  },
  footer: {
    height: 40,
  },
});
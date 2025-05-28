import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Calendar, TrendingUp, Clock, Heart, ArrowRight, Dumbbell, Calendar as CalendarIcon, Utensils, ChevronRight, Flame, Watch } from 'lucide-react-native';
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

// Mock data for streak
const streakData = {
  currentStreak: 5,
  bestStreak: 12,
  lastActiveDate: '2024-03-19',
  streakHistory: [true, true, true, true, true, false, true, true, true, true, true, false, true, true, true, true, true]
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
        
        {/* Streak Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Fitness Streak</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View History</Text>
              <ArrowRight size={16} color={Colors.dark.accent} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.streakCard}>
            <View style={styles.streakHeader}>
              <View style={styles.streakIconContainer}>
                <Flame size={24} color={Colors.dark.accent} />
              </View>
              <View style={styles.streakInfo}>
                <Text style={styles.streakValue}>{streakData.currentStreak} days</Text>
                <Text style={styles.streakLabel}>Current Streak</Text>
              </View>
              <View style={styles.streakDivider} />
              <View style={styles.streakInfo}>
                <Text style={styles.streakValue}>{streakData.bestStreak} days</Text>
                <Text style={styles.streakLabel}>Best Streak</Text>
              </View>
            </View>
            
            <View style={styles.streakCalendar}>
              {streakData.streakHistory.map((active, index) => (
                <View 
                  key={index} 
                  style={styles.streakDay}
                >
                  {active ? (
                    <Flame size={16} color={Colors.dark.accent} />
                  ) : (
                    <View style={styles.streakDayInactive} />
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
        
        {/* Health Stats Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Health Stats</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Connect to smart watch</Text>
              <Watch size={16} color={Colors.dark.accent} />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statsGrid}
          >
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
          </ScrollView>
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
    paddingHorizontal: Layout.spacing.l,
    paddingRight: Layout.spacing.l,
    gap: Layout.spacing.s,
  },
  statCard: {
    width: 100,
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.xs,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.dark.accent + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: Colors.dark.text,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
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
  streakCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  streakIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.dark.accent + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  streakInfo: {
    flex: 1,
  },
  streakValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.dark.text,
    marginBottom: 2,
  },
  streakLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + '80',
  },
  streakDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.dark.border,
    marginHorizontal: Layout.spacing.m,
  },
  streakCalendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: Layout.spacing.s,
  },
  streakDay: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  streakDayInactive: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.dark.border,
  },
});
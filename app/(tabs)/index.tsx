import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Calendar, TrendingUp, Clock, Heart, ArrowRight, Dumbbell } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useAuth } from '@/context/AuthContext';

// Mock data for charts
const weeklyActivityData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [60, 45, 70, 40, 65, 80, 55],
      color: () => Colors.dark.accent,
      strokeWidth: 2,
    },
  ],
};

const workoutData = {
  labels: ['Cardio', 'Strength', 'Flexibility', 'Balance'],
  datasets: [
    {
      data: [20, 45, 28, 15],
    },
  ],
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
        
        <View style={styles.chartSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Activity</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View Details</Text>
              <ArrowRight size={16} color={Colors.dark.accent} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.chartContainer}>
            <LineChart
              data={weeklyActivityData}
              width={Layout.window.width - Layout.spacing.l * 2}
              height={220}
              chartConfig={{
                backgroundGradientFrom: Colors.dark.card,
                backgroundGradientTo: Colors.dark.card,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(163, 94, 247, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: Colors.dark.accent,
                },
              }}
              bezier
              style={styles.chart}
            />
          </View>
        </View>
        
        <View style={styles.chartSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Workout Distribution</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View Details</Text>
              <ArrowRight size={16} color={Colors.dark.accent} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.chartContainer}>
            <BarChart
              data={workoutData}
              width={Layout.window.width - Layout.spacing.l * 2}
              height={220}
              yAxisLabel=""
              chartConfig={{
                backgroundGradientFrom: Colors.dark.card,
                backgroundGradientTo: Colors.dark.card,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(163, 94, 247, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                barPercentage: 0.7,
              }}
              style={styles.chart}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ArrowRight size={16} color={Colors.dark.accent} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.activityList}>
            {['Yoga Session', 'Morning Jog', 'Strength Training'].map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Dumbbell size={24} color={Colors.dark.accent} />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityName}>{activity}</Text>
                  <Text style={styles.activityTime}>{`${index + 1} ${index === 0 ? 'hour' : 'hours'} ago • ${Math.floor(Math.random() * 40) + 20} min`}</Text>
                </View>
                <View style={styles.activityStats}>
                  <Text style={styles.activityCalories}>{Math.floor(Math.random() * 300) + 100} cal</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Health Tips</Text>
          </View>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Hydration Reminder</Text>
            <Text style={styles.tipText}>
              Remember to drink at least 8 glasses of water today. Staying hydrated improves energy levels and brain function.
            </Text>
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
  chartSection: {
    marginBottom: Layout.spacing.l,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.l,
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
  chartContainer: {
    alignItems: 'center',
  },
  chart: {
    borderRadius: Layout.borderRadius.medium,
    paddingRight: 20,
  },
  activityList: {
    marginTop: Layout.spacing.s,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    marginBottom: Layout.spacing.s,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.dark.accent + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xs,
  },
  activityTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + '80',
  },
  activityStats: {
    alignItems: 'flex-end',
  },
  activityCalories: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.dark.accent,
  },
  tipCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.l,
  },
  tipTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.s,
  },
  tipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + '99',
    lineHeight: 22,
  },
  footer: {
    height: 40,
  },
});
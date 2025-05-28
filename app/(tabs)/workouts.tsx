import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Play, Clock, ChevronRight, Filter, Dumbbell, Star } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

const WORKOUT_CATEGORIES = [
  'All',
  'Cardio',
  'Strength',
  'Flexibility',
  'Recovery',
  'Physio'
];

const WORKOUTS = [
  {
    id: '1',
    title: 'Upper Body Strength',
    duration: '35 min',
    level: 'Intermediate',
    category: 'Strength',
    imageUrl: 'https://images.pexels.com/photos/4761792/pexels-photo-4761792.jpeg',
  },
  {
    id: '2',
    title: 'Back Pain Relief',
    duration: '20 min',
    level: 'Beginner',
    category: 'Physio',
    imageUrl: 'https://images.pexels.com/photos/3768917/pexels-photo-3768917.jpeg',
  },
  {
    id: '3',
    title: 'HIIT Cardio Blast',
    duration: '25 min',
    level: 'Advanced',
    category: 'Cardio',
    imageUrl: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg',
  },
  {
    id: '4',
    title: 'Yoga Flow',
    duration: '40 min',
    level: 'All Levels',
    category: 'Flexibility',
    imageUrl: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg',
  },
  {
    id: '5',
    title: 'Recovery Stretch',
    duration: '15 min',
    level: 'Beginner',
    category: 'Recovery',
    imageUrl: 'https://images.pexels.com/photos/6551126/pexels-photo-6551126.jpeg',
  }
];

interface Workout {
  id: string;
  title: string;
  duration: string;
  level: string;
  category: string;
  imageUrl: string;
}

export default function WorkoutsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredWorkouts = selectedCategory === 'All' 
    ? WORKOUTS 
    : WORKOUTS.filter(workout => workout.category === selectedCategory);
    
  const workoutCardRefs: { [key: string]: Animated.Value } = {};
  WORKOUTS.forEach(workout => {
    workoutCardRefs[workout.id] = new Animated.Value(1);
  });

  const handleCardPress = (workout: Workout) => {
    console.log('Workout pressed:', workout.title);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>Workout Plans</Text>
          
          <View style={styles.searchAndFilter}>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color={Colors.dark.text} />
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {WORKOUT_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryTab,
                selectedCategory === category && styles.categoryTabSelected
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextSelected
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.featuredContainer}
          contentContainerStyle={styles.featuredScrollContent}
        >
          {[
            {
              id: 'featured1',
              title: 'Full Body Workout Plan',
              subtitle: 'Complete 4-week program',
              duration: '45 min',
              level: 'Intermediate',
              imageUrl: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg'
            },
            {
              id: 'featured2',
              title: 'Core Strength Mastery',
              subtitle: '6-week transformation',
              duration: '30 min',
              level: 'Advanced',
              imageUrl: 'https://images.pexels.com/photos/4761792/pexels-photo-4761792.jpeg'
            },
            {
              id: 'featured3',
              title: 'Flexibility Journey',
              subtitle: '8-week mobility program',
              duration: '40 min',
              level: 'All Levels',
              imageUrl: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg'
            }
          ].map((featured) => (
            <View key={featured.id} style={styles.featuredWorkout}>
              <Image
                source={{ uri: featured.imageUrl }}
                style={styles.featuredImage}
              />
              <View style={styles.featuredOverlay}>
                <View style={styles.featuredContent}>
                  <View style={styles.featuredBadge}>
                    <Star size={12} color={Colors.dark.text} />
                    <Text style={styles.featuredBadgeText}>Featured</Text>
                  </View>
                  <Text style={styles.featuredTitle}>{featured.title}</Text>
                  <Text style={styles.featuredSubtitle}>{featured.subtitle}</Text>
                  
                  <View style={styles.featuredMeta}>
                    <View style={styles.metaItem}>
                      <Clock size={16} color={Colors.dark.text + '99'} />
                      <Text style={styles.metaText}>{featured.duration}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Dumbbell size={16} color={Colors.dark.text + '99'} />
                      <Text style={styles.metaText}>{featured.level}</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity style={styles.startButton}>
                    <Play size={18} color={Colors.dark.text} />
                    <Text style={styles.startButtonText}>Start Workout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Workouts' : `${selectedCategory} Workouts`}
          </Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <ChevronRight size={16} color={Colors.dark.accent} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.workoutGrid}>
          {filteredWorkouts.map((workout) => (
            <TouchableOpacity 
              key={workout.id} 
              style={styles.workoutCard}
              onPress={() => handleCardPress(workout)}
              onPressIn={() => {
                Animated.spring(workoutCardRefs[workout.id], {
                  toValue: 0.95,
                  useNativeDriver: true,
                }).start();
              }}
              onPressOut={() => {
                Animated.spring(workoutCardRefs[workout.id], {
                  toValue: 1,
                  useNativeDriver: true,
                }).start();
              }}
            >
              <Image source={{ uri: workout.imageUrl }} style={styles.workoutImage} />
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <View style={styles.workoutMeta}>
                  <View style={styles.metaItem}>
                    <Clock size={14} color={Colors.dark.text + '99'} />
                    <Text style={styles.workoutMetaText}>{workout.duration}</Text>
                  </View>
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelText}>{workout.level}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <ChevronRight size={16} color={Colors.dark.accent} />
          </TouchableOpacity>
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.recommendedContainer}
          contentContainerStyle={styles.recommendedContent}
        >
          {WORKOUTS.slice(0, 3).map((workout) => (
            <TouchableOpacity 
              key={workout.id} 
              style={styles.recommendedCard}
              onPress={() => handleCardPress(workout)}
              onPressIn={() => {
                Animated.spring(workoutCardRefs[workout.id], {
                  toValue: 0.95,
                  useNativeDriver: true,
                }).start();
              }}
              onPressOut={() => {
                Animated.spring(workoutCardRefs[workout.id], {
                  toValue: 1,
                  useNativeDriver: true,
                }).start();
              }}
            >
              <Image source={{ uri: workout.imageUrl }} style={styles.recommendedImage} />
              <View style={styles.recommendedInfo}>
                <Text style={styles.recommendedTitle}>{workout.title}</Text>
                <View style={styles.recommendedMeta}>
                  <Clock size={14} color={Colors.dark.text + '99'} />
                  <Text style={styles.recommendedMetaText}>{workout.duration}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
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
  headerSection: {
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.dark.text,
  },
  searchAndFilter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.medium,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.text,
    marginLeft: Layout.spacing.xs,
  },
  categoriesContainer: {
    paddingHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
  },
  categoriesContent: {
    paddingRight: Layout.spacing.l,
  },
  categoryTab: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.large,
    marginRight: Layout.spacing.s,
    backgroundColor: Colors.dark.card,
  },
  categoryTabSelected: {
    backgroundColor: Colors.dark.accent,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.text + '99',
  },
  categoryTextSelected: {
    color: Colors.dark.text,
  },
  featuredContainer: {
    paddingLeft: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
  },
  featuredScrollContent: {
    paddingRight: Layout.spacing.m,
  },
  featuredWorkout: {
    width: Layout.window.width - Layout.spacing.l * 2,
    marginRight: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
    height: 240,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  featuredContent: {
    padding: Layout.spacing.l,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.accent,
    alignSelf: 'flex-start',
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.small,
    marginBottom: Layout.spacing.s,
  },
  featuredBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.dark.text,
    marginLeft: 4,
  },
  featuredTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: Colors.dark.text,
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + 'CC',
    marginBottom: Layout.spacing.m,
  },
  featuredMeta: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.m,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + '99',
    marginLeft: Layout.spacing.xs,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.accent,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.medium,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.dark.text,
    marginLeft: Layout.spacing.xs,
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
    marginRight: 2,
  },
  workoutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Layout.spacing.l - Layout.spacing.xs, // Offset for internal margin
    marginBottom: Layout.spacing.l,
  },
  workoutCard: {
    width: (Layout.window.width - Layout.spacing.l * 2 - Layout.spacing.s) / 2,
    marginHorizontal: Layout.spacing.xs,
    marginBottom: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
    backgroundColor: Colors.dark.card,
    shadowColor: Colors.dark.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 8,
    elevation: 0,
    transform: [{ scale: 1 }],
  },
  workoutImage: {
    width: '100%',
    height: 120,
  },
  workoutInfo: {
    padding: Layout.spacing.m,
  },
  workoutTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xs,
  },
  workoutMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutMetaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text + '99',
    marginLeft: 4,
  },
  levelBadge: {
    backgroundColor: Colors.dark.accent + '40',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.small,
  },
  levelText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: Colors.dark.accent,
  },
  recommendedContainer: {
    paddingLeft: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
  },
  recommendedContent: {
    paddingRight: Layout.spacing.m,
  },
  recommendedCard: {
    width: 200,
    marginRight: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
    backgroundColor: Colors.dark.card,
    shadowColor: Colors.dark.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 8,
    elevation: 0,
    transform: [{ scale: 1 }],
  },
  recommendedImage: {
    width: '100%',
    height: 120,
  },
  recommendedInfo: {
    padding: Layout.spacing.m,
  },
  recommendedTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.s,
  },
  recommendedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendedMetaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text + '99',
    marginLeft: 4,
  },
  footer: {
    height: 40,
  },
});
import React, { useState, useRef } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Animated, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Play, Clock, ChevronRight, Filter, Dumbbell, Star, Plus } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/constants/Layout';
import { router } from 'expo-router';

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

const WorkoutsScreen = () => {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isExpanded, setIsExpanded] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  
  const handleButtonPress = () => {
    const toValue = isExpanded ? 0 : 100;
    const textToValue = isExpanded ? 0 : 1;
    
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true,
        friction: 5,
        tension: 40
      }),
      Animated.parallel([
        Animated.spring(translateX, {
          toValue,
          useNativeDriver: true,
          friction: 5,
          tension: 40
        }),
        Animated.timing(textOpacity, {
          toValue: textToValue,
          duration: 150,
          useNativeDriver: true
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 5,
          tension: 40
        })
      ])
    ]).start();
    
    setIsExpanded(!isExpanded);
  };

  const handleCreateWorkout = () => {
    router.push('/personalized-workout');
  };

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colors.background === '#FFFFFF' ? 'dark' : 'light'} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <Text style={[styles.pageTitle, { color: colors.text }]}>Workout Plans</Text>
          
          <View style={styles.searchAndFilter}>
            <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.card }]}>
              <Filter size={16} color={colors.text} />
              <Text style={[styles.filterText, { color: colors.text }]}>Filter</Text>
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
                { backgroundColor: colors.card },
                selectedCategory === category && { backgroundColor: colors.accent }
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  { color: colors.text },
                  selectedCategory === category && { color: colors.text }
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
                  <View style={[styles.featuredBadge, { backgroundColor: colors.card }]}>
                    <Star size={12} color={colors.text} />
                    <Text style={[styles.featuredBadgeText, { color: colors.text }]}>Featured</Text>
                  </View>
                  <Text style={[styles.featuredTitle, { color: colors.text }]}>{featured.title}</Text>
                  <Text style={[styles.featuredSubtitle, { color: colors.text + '99' }]}>{featured.subtitle}</Text>
                  
                  <View style={styles.featuredMeta}>
                    <View style={styles.metaItem}>
                      <Clock size={16} color={colors.text + '99'} />
                      <Text style={[styles.metaText, { color: colors.text + '99' }]}>{featured.duration}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Dumbbell size={16} color={colors.text + '99'} />
                      <Text style={[styles.metaText, { color: colors.text + '99' }]}>{featured.level}</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity style={[styles.startButton, { backgroundColor: colors.accent }]}>
                    <Play size={18} color={colors.text} />
                    <Text style={[styles.startButtonText, { color: colors.text }]}>Start Workout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {selectedCategory === 'All' ? 'All Workouts' : `${selectedCategory} Workouts`}
          </Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={[styles.viewAllText, { color: colors.accent }]}>View All</Text>
            <ChevronRight size={16} color={colors.accent} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.workoutGrid}>
          {filteredWorkouts.map((workout) => (
            <TouchableOpacity 
              key={workout.id} 
              style={[styles.workoutCard, { backgroundColor: colors.card }]}
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
                <Text style={[styles.workoutTitle, { color: colors.text }]}>{workout.title}</Text>
                <View style={styles.workoutMeta}>
                  <View style={styles.metaItem}>
                    <Clock size={14} color={colors.text + '99'} />
                    <Text style={[styles.workoutMetaText, { color: colors.text + '99' }]}>{workout.duration}</Text>
                  </View>
                  <View style={[styles.levelBadge, { backgroundColor: colors.accent + '20' }]}>
                    <Text style={[styles.levelText, { color: colors.accent }]}>{workout.level}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recommended For You</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={[styles.viewAllText, { color: colors.accent }]}>View All</Text>
            <ChevronRight size={16} color={colors.accent} />
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
              style={[styles.recommendedCard, { backgroundColor: colors.card }]}
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
                <Text style={[styles.recommendedTitle, { color: colors.text }]}>{workout.title}</Text>
                <View style={styles.recommendedMeta}>
                  <Clock size={14} color={colors.text + '99'} />
                  <Text style={[styles.recommendedMetaText, { color: colors.text + '99' }]}>{workout.duration}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <View style={styles.footer} />
      </ScrollView>

      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.accent }]}
        onPress={handleCreateWorkout}
      >
        <Plus size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
  },
  pageTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  searchAndFilter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.small,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: Layout.spacing.xs,
  },
  categoriesContainer: {
    marginBottom: Layout.spacing.m,
  },
  categoriesContent: {
    paddingHorizontal: Layout.spacing.l,
  },
  categoryTab: {
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    marginRight: Layout.spacing.m,
    borderRadius: Layout.borderRadius.small,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  featuredContainer: {
    marginBottom: Layout.spacing.l,
  },
  featuredScrollContent: {
    paddingHorizontal: Layout.spacing.l,
  },
  featuredWorkout: {
    width: 300,
    height: 400,
    marginRight: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    padding: Layout.spacing.m,
  },
  featuredContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.s,
    borderRadius: Layout.borderRadius.small,
    marginBottom: Layout.spacing.s,
  },
  featuredBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: Layout.spacing.xs,
  },
  featuredTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: Layout.spacing.xs,
  },
  featuredSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
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
    marginLeft: Layout.spacing.xs,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.small,
  },
  startButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
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
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginRight: Layout.spacing.xs,
  },
  workoutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
  },
  workoutCard: {
    width: '48%',
    marginBottom: Layout.spacing.m,
    marginRight: '4%',
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
  },
  workoutImage: {
    width: '100%',
    height: 150,
  },
  workoutInfo: {
    padding: Layout.spacing.m,
  },
  workoutTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
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
    marginLeft: Layout.spacing.xs,
  },
  levelBadge: {
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.small,
  },
  levelText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  recommendedContainer: {
    marginBottom: Layout.spacing.l,
  },
  recommendedContent: {
    paddingHorizontal: Layout.spacing.l,
  },
  recommendedCard: {
    width: 200,
    marginRight: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
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
    fontSize: 16,
    marginBottom: Layout.spacing.xs,
  },
  recommendedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendedMetaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: Layout.spacing.xs,
  },
  footer: {
    height: 80,
  },
  fab: {
    position: 'absolute',
    right: Layout.spacing.l,
    bottom: Layout.spacing.l,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
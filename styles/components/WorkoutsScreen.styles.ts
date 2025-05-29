import { StyleSheet, Dimensions, Platform } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: Layout.spacing.m,
  },
  pageTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
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
    marginTop: Layout.spacing.m,
  },
  categoriesContent: {
    paddingHorizontal: Layout.spacing.l,
  },
  categoryTab: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    marginRight: Layout.spacing.s,
    borderRadius: Layout.borderRadius.medium,
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
    marginTop: Layout.spacing.xl,
  },
  featuredScrollContent: {
    paddingHorizontal: Layout.spacing.l,
  },
  featuredWorkout: {
    width: width * 0.8,
    height: 400,
    marginRight: Layout.spacing.m,
    borderRadius: Layout.borderRadius.large,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: Layout.spacing.l,
    justifyContent: 'flex-end',
  },
  featuredContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.accent + '40',
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.small,
    alignSelf: 'flex-start',
    marginBottom: Layout.spacing.m,
  },
  featuredBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.dark.text,
    marginLeft: Layout.spacing.xs,
  },
  featuredTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xs,
  },
  featuredSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.dark.text + '99',
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
    marginTop: Layout.spacing.xl,
    marginBottom: Layout.spacing.m,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
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
  workoutGrid: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.xl,
  },
  workoutCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.m,
    overflow: 'hidden',
  },
  workoutImage: {
    width: '100%',
    height: 200,
  },
  workoutContent: {
    padding: Layout.spacing.m,
  },
  workoutInfo: {
    padding: Layout.spacing.m,
  },
  workoutTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xs,
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  workoutMetaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text + '99',
    marginLeft: 4,
  },
  workoutLevel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.dark.accent,
    backgroundColor: Colors.dark.accent + '20',
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.small,
    marginRight: Layout.spacing.s,
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
  workoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.accent,
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.medium,
  },
  workoutButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.dark.text,
    marginLeft: Layout.spacing.xs,
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
import { StyleSheet, Platform } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    backgroundColor: Colors.dark.card,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: Layout.spacing.l,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.l,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.dark.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  profileInitial: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.dark.text,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: Colors.dark.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + '99',
  },
  settingsButton: {
    padding: Layout.spacing.s,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Layout.spacing.l,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    marginHorizontal: Layout.spacing.xs,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.dark.text,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text + '99',
  },
  bmiCategory: {
    backgroundColor: Colors.dark.accent + '20',
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.small,
    marginTop: Layout.spacing.xs,
  },
  bmiCategoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: Colors.dark.accent,
  },
  preferencesSection: {
    padding: Layout.spacing.l,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.m,
  },
  preferencesContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  preferenceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.accent + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  preferenceEmoji: {
    fontSize: 20,
  },
  preferenceContent: {
    flex: 1,
  },
  preferenceLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.text,
    marginBottom: 2,
  },
  preferenceValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text + '99',
  },
  menuSection: {
    padding: Layout.spacing.l,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    marginBottom: Layout.spacing.s,
  },
  menuIcon: {
    marginRight: Layout.spacing.m,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: 2,
  },
  menuDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text + '99',
  },
  menuArrow: {
    marginLeft: Layout.spacing.m,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.error + '20',
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    margin: Layout.spacing.l,
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.dark.error,
    marginLeft: Layout.spacing.s,
  },
}); 
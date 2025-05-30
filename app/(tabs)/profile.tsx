import React, { useCallback } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Platform, Animated, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LogOut, Settings, Bell, CreditCard, Shield, CircleHelp as HelpCircle, User, Lock, ChevronRight } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/constants/Layout';

const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const { colors } = useTheme();
  
  const menuItems = [
    {
      icon: <User size={20} color={colors.text} />,
      title: 'Personal Information',
      description: 'Update your personal details',
    },
    {
      icon: <Bell size={20} color={colors.text} />,
      title: 'Notifications',
      description: 'Manage notification preferences',
    },
    {
      icon: <CreditCard size={20} color={colors.text} />,
      title: 'Payment Methods',
      description: 'Manage your payment options',
    },
    {
      icon: <Lock size={20} color={colors.text} />,
      title: 'Security',
      description: 'Password and authentication settings',
    },
    {
      icon: <Shield size={20} color={colors.text} />,
      title: 'Privacy',
      description: 'Control your data and privacy settings',
    },
    {
      icon: <HelpCircle size={20} color={colors.text} />,
      title: 'Help & Support',
      description: 'FAQs and contact information',
    },
  ];
  
  const statCardRefs = {
    height: new Animated.Value(1),
    weight: new Animated.Value(1),
    bmi: new Animated.Value(1)
  };

  const menuItemRefs: { [key: string]: Animated.Value } = {};
  menuItems.forEach(item => {
    menuItemRefs[item.title] = new Animated.Value(1);
  });

  const handleStatCardPress = (stat: string) => {
    console.log('Stat card pressed:', stat);
  };

  const handleMenuItemPress = (item: { title: string; description: string }) => {
    console.log('Menu item pressed:', item.title);
  };

  const calculateBMI = useCallback(() => {
    if (!user?.height || !user?.weight) return '—';
    
    const heightInMeters = user.height / 100;
    const bmi = user.weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  }, [user?.height, user?.weight]);
  
  const getBMICategory = useCallback(() => {
    const bmi = parseFloat(calculateBMI());
    if (isNaN(bmi)) return '';
    
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }, [calculateBMI]);
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colors.background === '#FFFFFF' ? 'dark' : 'light'} />
      
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.headerContent}>
          <View style={styles.profileInfo}>
            <View style={[styles.profileImageContainer, { backgroundColor: colors.accent }]}>
              <Text style={[styles.profileInitial, { color: colors.background }]}>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </Text>
            </View>
            <View style={styles.profileDetails}>
              <Text style={[styles.profileName, { color: colors.text }]}>{user?.name || 'User'}</Text>
              <Text style={[styles.profileEmail, { color: colors.text + '99' }]}>{user?.email || 'user@example.com'}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={[styles.settingsButton, { backgroundColor: colors.background }]}>
            <Settings size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <TouchableOpacity 
            style={[styles.statCard, { backgroundColor: colors.card }]}
            onPress={() => handleStatCardPress('height')}
            onPressIn={() => {
              Animated.spring(statCardRefs.height, {
                toValue: 0.95,
                useNativeDriver: true,
              }).start();
            }}
            onPressOut={() => {
              Animated.spring(statCardRefs.height, {
                toValue: 1,
                useNativeDriver: true,
              }).start();
            }}
          >
            <Text style={[styles.statValue, { color: colors.text }]}>{user?.height || '—'}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '99' }]}>Height (cm)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.statCard, { backgroundColor: colors.card }]}
            onPress={() => handleStatCardPress('weight')}
            onPressIn={() => {
              Animated.spring(statCardRefs.weight, {
                toValue: 0.95,
                useNativeDriver: true,
              }).start();
            }}
            onPressOut={() => {
              Animated.spring(statCardRefs.weight, {
                toValue: 1,
                useNativeDriver: true,
              }).start();
            }}
          >
            <Text style={[styles.statValue, { color: colors.text }]}>{user?.weight || '—'}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '99' }]}>Weight (kg)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.statCard, { backgroundColor: colors.card }]}
            onPress={() => handleStatCardPress('bmi')}
            onPressIn={() => {
              Animated.spring(statCardRefs.bmi, {
                toValue: 0.95,
                useNativeDriver: true,
              }).start();
            }}
            onPressOut={() => {
              Animated.spring(statCardRefs.bmi, {
                toValue: 1,
                useNativeDriver: true,
              }).start();
            }}
          >
            <Text style={[styles.statValue, { color: colors.text }]}>{calculateBMI()}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '99' }]}>BMI</Text>
            {getBMICategory() && (
              <View style={[styles.bmiCategory, { backgroundColor: colors.accent + '20' }]}>
                <Text style={[styles.bmiCategoryText, { color: colors.accent }]}>{getBMICategory()}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        <View style={[styles.preferencesSection, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Preferences</Text>
          
          <View style={styles.preferencesContainer}>
            <View style={[styles.preferenceItem, { backgroundColor: colors.background }]}>
              <View style={[styles.preferenceIcon, { backgroundColor: colors.card }]}>
                <Text style={styles.preferenceEmoji}>🎯</Text>
              </View>
              <View style={styles.preferenceContent}>
                <Text style={[styles.preferenceLabel, { color: colors.text }]}>Fitness Goal</Text>
                <Text style={[styles.preferenceValue, { color: colors.text + '99' }]}>{user?.fitnessGoal || 'Not set'}</Text>
              </View>
            </View>
            
            <View style={[styles.preferenceItem, { backgroundColor: colors.background }]}>
              <View style={[styles.preferenceIcon, { backgroundColor: colors.card }]}>
                <Text style={styles.preferenceEmoji}>🥗</Text>
              </View>
              <View style={styles.preferenceContent}>
                <Text style={[styles.preferenceLabel, { color: colors.text }]}>Dietary Preference</Text>
                <Text style={[styles.preferenceValue, { color: colors.text + '99' }]}>{user?.dietaryPreference || 'Not set'}</Text>
              </View>
            </View>
            
            {user?.medicalIssues && (
              <View style={[styles.preferenceItem, { backgroundColor: colors.background }]}>
                <View style={[styles.preferenceIcon, { backgroundColor: colors.card }]}>
                  <Text style={styles.preferenceEmoji}>🏥</Text>
                </View>
                <View style={styles.preferenceContent}>
                  <Text style={[styles.preferenceLabel, { color: colors.text }]}>Medical Issues</Text>
                  <Text style={[styles.preferenceValue, { color: colors.text + '99' }]}>{user.medicalIssues}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
          
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.title}
              style={[styles.menuItem, { backgroundColor: colors.card }]}
              onPress={() => handleMenuItemPress(item)}
              onPressIn={() => {
                Animated.spring(menuItemRefs[item.title], {
                  toValue: 0.95,
                  useNativeDriver: true,
                }).start();
              }}
              onPressOut={() => {
                Animated.spring(menuItemRefs[item.title], {
                  toValue: 1,
                  useNativeDriver: true,
                }).start();
              }}
            >
              <View style={[styles.preferenceIcon, { backgroundColor: colors.background }]}>
                {item.icon}
              </View>
              <View style={styles.preferenceContent}>
                <Text style={[styles.preferenceLabel, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.preferenceValue, { color: colors.text + '99' }]}>{item.description}</Text>
              </View>
              <ChevronRight size={20} color={colors.text + '80'} />
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: colors.card }]} 
          onPress={handleSignOut}
        >
          <LogOut size={20} color={colors.text + '99'} />
          <Text style={[styles.logoutText, { color: colors.text + '99' }]}>Log Out</Text>
        </TouchableOpacity>
        
        <View style={styles.versionInfo}>
          <Text style={[styles.versionText, { color: colors.text + '99' }]}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.l,
    borderBottomLeftRadius: Layout.borderRadius.large,
    borderBottomRightRadius: Layout.borderRadius.large,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  profileInitial: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 2,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.l,
    marginTop: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
  },
  statCard: {
    flex: 1,
    marginHorizontal: Layout.spacing.xs,
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginVertical: Layout.spacing.xs,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    textAlign: 'center',
  },
  bmiCategory: {
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.small,
    marginTop: Layout.spacing.xs,
  },
  bmiCategoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  preferencesSection: {
    marginHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
    padding: Layout.spacing.l,
    borderRadius: Layout.borderRadius.medium,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: Layout.spacing.m,
  },
  preferencesContainer: {
    gap: Layout.spacing.m,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
  },
  preferenceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 2,
  },
  preferenceValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  menuSection: {
    marginHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.xs,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.m,
    marginHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
    borderRadius: Layout.borderRadius.medium,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: Layout.spacing.s,
  },
  versionInfo: {
    alignItems: 'center',
    marginBottom: Layout.spacing.l,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});
export default ProfileScreen;

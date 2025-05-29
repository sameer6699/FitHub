import React, { useCallback } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Platform, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LogOut, Settings, Bell, CreditCard, Shield, CircleHelp as HelpCircle, User, Lock, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useAuth } from '@/context/AuthContext';
import { styles } from '@/styles/components/ProfileScreen.styles';

const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  
  const menuItems = [
    {
      icon: <User size={20} color={Colors.dark.accent} />,
      title: 'Personal Information',
      description: 'Update your personal details',
    },
    {
      icon: <Bell size={20} color={Colors.dark.accent} />,
      title: 'Notifications',
      description: 'Manage notification preferences',
    },
    {
      icon: <CreditCard size={20} color={Colors.dark.accent} />,
      title: 'Payment Methods',
      description: 'Manage your payment options',
    },
    {
      icon: <Lock size={20} color={Colors.dark.accent} />,
      title: 'Security',
      description: 'Password and authentication settings',
    },
    {
      icon: <Shield size={20} color={Colors.dark.accent} />,
      title: 'Privacy',
      description: 'Control your data and privacy settings',
    },
    {
      icon: <HelpCircle size={20} color={Colors.dark.accent} />,
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
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.profileInfo}>
            <View style={styles.profileImageContainer}>
              <Text style={styles.profileInitial}>
                {user?.name?.charAt(0) || 'U'}
              </Text>
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>{user?.name || 'User'}</Text>
              <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color={Colors.dark.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <TouchableOpacity 
            style={styles.statCard}
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
            <Text style={styles.statValue}>{user?.height || '—'}</Text>
            <Text style={styles.statLabel}>Height (cm)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.statCard}
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
            <Text style={styles.statValue}>{user?.weight || '—'}</Text>
            <Text style={styles.statLabel}>Weight (kg)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.statCard}
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
            <Text style={styles.statValue}>{calculateBMI()}</Text>
            <Text style={styles.statLabel}>BMI</Text>
            {getBMICategory() && (
              <View style={styles.bmiCategory}>
                <Text style={styles.bmiCategoryText}>{getBMICategory()}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>Your Preferences</Text>
          
          <View style={styles.preferencesContainer}>
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceIcon}>
                <Text style={styles.preferenceEmoji}>🎯</Text>
              </View>
              <View style={styles.preferenceContent}>
                <Text style={styles.preferenceLabel}>Fitness Goal</Text>
                <Text style={styles.preferenceValue}>{user?.fitnessGoal || 'Not set'}</Text>
              </View>
            </View>
            
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceIcon}>
                <Text style={styles.preferenceEmoji}>🥗</Text>
              </View>
              <View style={styles.preferenceContent}>
                <Text style={styles.preferenceLabel}>Dietary Preference</Text>
                <Text style={styles.preferenceValue}>{user?.dietaryPreference || 'Not set'}</Text>
              </View>
            </View>
            
            {user?.medicalIssues && (
              <View style={styles.preferenceItem}>
                <View style={styles.preferenceIcon}>
                  <Text style={styles.preferenceEmoji}>🏥</Text>
                </View>
                <View style={styles.preferenceContent}>
                  <Text style={styles.preferenceLabel}>Medical Issues</Text>
                  <Text style={styles.preferenceValue}>{user.medicalIssues}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.title}
              style={styles.menuItem}
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
              <View style={styles.preferenceIcon}>
                {item.icon}
              </View>
              <View style={styles.preferenceContent}>
                <Text style={styles.preferenceLabel}>{item.title}</Text>
                <Text style={styles.preferenceValue}>{item.description}</Text>
              </View>
              <ChevronRight size={20} color={Colors.dark.text + '40'} />
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <LogOut size={20} color={Colors.dark.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
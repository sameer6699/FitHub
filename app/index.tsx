import { Text, View, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { Activity, Dumbbell, Calendar } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { styles } from '@/styles/components/LandingScreen.styles';

export default function LandingScreen() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateFeatures = () => {
      // Reset animation
      progressAnim.setValue(0);
      setCurrentFeature(0);

      // Create animation sequence
      Animated.sequence([
        // First feature
        Animated.timing(progressAnim, {
          toValue: 0.33,
          duration: 1000,
          useNativeDriver: false,
        }),
        // Second feature
        Animated.timing(progressAnim, {
          toValue: 0.66,
          duration: 1000,
          useNativeDriver: false,
        }),
        // Third feature
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start();

      // Update current feature with delay
      setTimeout(() => setCurrentFeature(1), 1000);
      setTimeout(() => setCurrentFeature(2), 2000);
      setTimeout(() => setCurrentFeature(3), 3000);
    };

    animateFeatures();

    // Cleanup function
    return () => {
      progressAnim.stopAnimation();
    };
  }, []);

  const renderFeatureItem = (icon: React.ReactNode, text: string, index: number) => {
    if (index > currentFeature) return null;
    
    return (
      <Animated.View 
        style={[
          styles.featureItem,
          {
            opacity: currentFeature === index ? 1 : 0.7,
          }
        ]}
      >
        <View style={styles.featureIcon}>
          {icon}
        </View>
        <Text style={styles.featureText}>{text}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg' }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.85)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Dumbbell color="#613eea" size={32} style={styles.logoIcon} />
              <Text style={styles.title}>FitHub</Text>
              <Text style={styles.subtitle}>Health ◦ Physiotherapy ◦ Fitness</Text>
            </View>

            <View style={styles.features}>
              {renderFeatureItem(<Activity color={Colors.dark.accent} size={24} />, 'Health Analytics', 1)}
              {renderFeatureItem(<Dumbbell color={Colors.dark.accent} size={24} />, 'Workout Planning', 2)}
              {renderFeatureItem(<Calendar color={Colors.dark.accent} size={24} />, 'Appointment Booking', 3)}
            </View>

            <View style={styles.actions}>
              <Link href="/login" asChild>
                <TouchableOpacity style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
              </Link>
              
              <Link href="/signup" asChild>
                <TouchableOpacity style={styles.signupButton}>
                  <Text style={styles.signupButtonText}>Create Account</Text>
                </TouchableOpacity>
              </Link>
            </View>

            <View style={styles.progressBarContainer}>
              <Animated.View 
                style={[
                  styles.progressBar,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 0.33, 0.66, 1],
                      outputRange: ['0%', '33.33%', '66.66%', '100%'],
                    }),
                  }
                ]} 
              />
            </View>

            <Text style={styles.footerText}>
              Your path to better health starts here
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Activity, Dumbbell, Calendar } from 'lucide-react-native';

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/7674493/pexels-photo-7674493.jpeg' }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>FitHub</Text>
              <Text style={styles.subtitle}>Health & Physiotherapy</Text>
            </View>

            <View style={styles.features}>
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Activity color={Colors.dark.accent} size={24} />
                </View>
                <Text style={styles.featureText}>Health Analytics</Text>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Dumbbell color={Colors.dark.accent} size={24} />
                </View>
                <Text style={styles.featureText}>Workout Planning</Text>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Calendar color={Colors.dark.accent} size={24} />
                </View>
                <Text style={styles.featureText}>Appointment Booking</Text>
              </View>
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

            <Text style={styles.footerText}>
              Your path to better health starts here
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Layout.spacing.l,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 50,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: Colors.dark.text,
    opacity: 0.8,
  },
  features: {
    marginVertical: Layout.spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  featureText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.dark.text,
  },
  actions: {
    marginBottom: Layout.spacing.xl,
  },
  loginButton: {
    backgroundColor: Colors.dark.accent,
    borderRadius: Layout.borderRadius.medium,
    paddingVertical: Layout.spacing.m,
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  loginButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.dark.text,
  },
  signupButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.dark.text,
    borderRadius: Layout.borderRadius.medium,
    paddingVertical: Layout.spacing.m,
    alignItems: 'center',
  },
  signupButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.dark.text,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text,
    textAlign: 'center',
    opacity: 0.6,
  },
});
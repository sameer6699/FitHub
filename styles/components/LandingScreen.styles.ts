import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

export const styles = StyleSheet.create({
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
  logoIcon: {
    marginBottom: Layout.spacing.xs,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text,
    opacity: 0.9,
    letterSpacing: 1,
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
    padding: Layout.spacing.m,
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  loginButtonText: {
    color: Colors.dark.text,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: 'transparent',
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.accent,
  },
  signupButtonText: {
    color: Colors.dark.accent,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginBottom: Layout.spacing.m,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.dark.accent,
    borderRadius: 2,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text,
    opacity: 0.6,
    textAlign: 'center',
  },
}); 
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.m,
  },
  backButton: {
    padding: Layout.spacing.s,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.dark.text,
    marginLeft: Layout.spacing.m,
  },
  formContainer: {
    flex: 1,
    padding: Layout.spacing.l,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.s,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.dark.text + '99',
    marginBottom: Layout.spacing.xl,
  },
  successMessage: {
    backgroundColor: Colors.dark.success + '20',
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.m,
  },
  successText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.success,
    textAlign: 'center',
  },
  errorMessage: {
    backgroundColor: Colors.dark.error + '20',
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.m,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.error,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.m,
  },
  inputIcon: {
    marginRight: Layout.spacing.s,
  },
  input: {
    flex: 1,
    height: 50,
    color: Colors.dark.text,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  eyeIcon: {
    padding: Layout.spacing.s,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Layout.spacing.xl,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.accent,
  },
  loginButton: {
    backgroundColor: Colors.dark.accent,
    borderRadius: Layout.borderRadius.medium,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  loginButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.dark.text,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + '99',
  },
  signupLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.dark.accent,
  },
}); 
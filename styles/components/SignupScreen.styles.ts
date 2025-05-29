import { StyleSheet, Platform } from 'react-native';
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
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
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
  progressContainer: {
    paddingHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.xl,
  },
  progressSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  progressStep: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  progressStepContent: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  progressCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
    borderWidth: 2,
    borderColor: Colors.dark.accent + '40',
  },
  progressCircleActive: {
    backgroundColor: Colors.dark.accent,
    borderColor: Colors.dark.accent,
  },
  progressCircleCompleted: {
    backgroundColor: Colors.dark.accent,
    borderColor: Colors.dark.accent,
  },
  progressNumber: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.text + '99',
  },
  progressNumberActive: {
    color: Colors.dark.text,
  },
  progressNumberCompleted: {
    color: Colors.dark.text,
  },
  progressLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: Colors.dark.text + '80',
    marginTop: Layout.spacing.xs,
    textAlign: 'center',
    maxWidth: 80,
  },
  progressLabelActive: {
    color: Colors.dark.text,
    fontFamily: 'Inter-Medium',
  },
  progressLabelCompleted: {
    color: Colors.dark.accent,
    fontFamily: 'Inter-Medium',
  },
  progressLine: {
    position: 'absolute',
    top: 16,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: Colors.dark.accent + '20',
    zIndex: 0,
  },
  progressLineActive: {
    backgroundColor: Colors.dark.accent,
  },
  animatedProgressContainer: {
    height: 4,
    backgroundColor: Colors.dark.card,
    borderRadius: 2,
    marginTop: Layout.spacing.m,
    overflow: 'hidden',
  },
  animatedProgressBar: {
    height: '100%',
    backgroundColor: Colors.dark.accent,
    borderRadius: 2,
  },
  checkmarkContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formScroll: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    padding: Layout.spacing.l,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.s,
  },
  sectionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.dark.text + '99',
    marginBottom: Layout.spacing.xl,
  },
  inputGroup: {
    marginBottom: Layout.spacing.l,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.xs,
  },
  input: {
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    color: Colors.dark.text,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  inputError: {
    borderColor: Colors.dark.error,
    borderWidth: 1,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.error,
    marginTop: Layout.spacing.xs,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    paddingVertical: Layout.spacing.m,
    alignItems: 'center',
    marginHorizontal: Layout.spacing.xs,
  },
  radioButtonSelected: {
    backgroundColor: Colors.dark.accent,
  },
  radioButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.text + '99',
  },
  radioButtonTextSelected: {
    color: Colors.dark.text,
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Layout.spacing.m,
  },
  optionButton: {
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    marginRight: Layout.spacing.s,
    marginBottom: Layout.spacing.s,
  },
  optionButtonSelected: {
    backgroundColor: Colors.dark.accent,
  },
  optionButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text,
  },
  optionButtonTextSelected: {
    color: Colors.dark.text,
  },
  optionsScroll: {
    marginBottom: Layout.spacing.m,
  },
  checkIcon: {
    position: 'absolute',
    top: Layout.spacing.xs,
    right: Layout.spacing.xs,
  },
  buttonContainer: {
    marginTop: Layout.spacing.xl,
  },
  button: {
    backgroundColor: Colors.dark.accent,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: Colors.dark.accent,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.dark.text,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    paddingHorizontal: Layout.spacing.m,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    color: Colors.dark.text,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  eyeIcon: {
    padding: Layout.spacing.s,
  },
  generalError: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.error,
    textAlign: 'center',
    marginBottom: Layout.spacing.m,
    padding: Layout.spacing.m,
    backgroundColor: Colors.dark.error + '20',
    borderRadius: Layout.borderRadius.medium,
  },
  textArea: {
    minHeight: 100,
    paddingTop: Layout.spacing.m,
  },
  otherInputContainer: {
    marginTop: Layout.spacing.m,
  },
}); 
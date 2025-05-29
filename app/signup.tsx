import React from 'react';
import { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Check, Eye, EyeOff } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useAuth } from '@/context/AuthContext';
import { styles } from '@/styles/components/SignupScreen.styles';

// Signup form steps
const STEPS = [
  'Basic Info',
  'Personal Info',
  'Physical Info',
  'Security',
  'Preferences'
];

// Fitness goals options
const FITNESS_GOALS = [
  'Weight Loss',
  'Muscle Gain',
  'Improved Fitness',
  'Rehabilitation',
  'Sports Performance',
  'Other'
];

// Dietary preferences options
const DIETARY_PREFERENCES = [
  'No Restrictions',
  'Vegetarian',
  'Non-Veg',
  'Vegan',
  'Gluten-Free',
  'Keto',
  'Paleo',
  'Other'
];

export default function SignupScreen() {
  const { register, isLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    password: '',
    confirmPassword: '',
    fitnessGoal: '',
    dietaryPreference: '',
    medicalIssues: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtherFitnessGoal, setShowOtherFitnessGoal] = useState(false);
  const [otherFitnessGoal, setOtherFitnessGoal] = useState('');
  const [showOtherDietaryPreference, setShowOtherDietaryPreference] = useState(false);
  const [otherDietaryPreference, setOtherDietaryPreference] = useState('');

  // Update form data
  const updateFormData = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    
    // Handle Other fitness goal selection
    if (key === 'fitnessGoal') {
      setShowOtherFitnessGoal(value === 'Other');
      if (value !== 'Other') {
        setOtherFitnessGoal('');
      }
    }
    
    // Handle Other dietary preference selection
    if (key === 'dietaryPreference') {
      setShowOtherDietaryPreference(value === 'Other');
      if (value !== 'Other') {
        setOtherDietaryPreference('');
      }
    }
    
    // Validate email immediately after entry
    if (key === 'email') {
      if (!value.trim()) {
        setErrors(prev => ({ ...prev, email: 'Email is required' }));
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        // Clear email error if validation passes
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      }
    } else if (errors[key]) {
      // Clear error for other fields if exists
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  // Validate current step
  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    switch (currentStep) {
      case 0: // Basic Info
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        break;
        
      case 1: // Personal Details
        if (!formData.age.trim()) {
          newErrors.age = 'Age is required';
        } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
          newErrors.age = 'Age must be a positive number';
        }
        if (!formData.gender.trim()) newErrors.gender = 'Gender is required';
        break;
        
      case 2: // Physical Info
        if (!formData.height.trim()) {
          newErrors.height = 'Height is required';
        } else if (isNaN(Number(formData.height)) || Number(formData.height) <= 0) {
          newErrors.height = 'Height must be a positive number';
        }
        if (!formData.weight.trim()) {
          newErrors.weight = 'Weight is required';
        } else if (isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
          newErrors.weight = 'Weight must be a positive number';
        }
        break;
        
      case 3: // Security
        if (!formData.password.trim()) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        }
        if (!formData.confirmPassword.trim()) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
        
      case 4: // Preferences
        if (!formData.fitnessGoal.trim()) newErrors.fitnessGoal = 'Please select a fitness goal';
        if (!formData.dietaryPreference.trim()) newErrors.dietaryPreference = 'Please select a dietary preference';
        // Medical issues is optional
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Go to next step or submit form
  const handleNext = () => {
    if (!validateStep()) return;
    
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit form
      handleSubmit();
    }
  };

  // Go to previous step
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      router.back();
    }
  };

  // Submit form
  const handleSubmit = async () => {
    try {
      await register({
        name: formData.name,
        email: formData.email,
        age: Number(formData.age),
        gender: formData.gender,
        height: Number(formData.height),
        weight: Number(formData.weight),
        password: formData.password,
        fitnessGoal: formData.fitnessGoal,
        dietaryPreference: formData.dietaryPreference,
        medicalIssues: formData.medicalIssues,
      });
    } catch (error: any) {
      console.error('Signup error:', error);
      // Handle specific field errors
      if (error.message.includes('email')) {
        setErrors(prev => ({ ...prev, email: error.message }));
        // Go back to the email step
        setCurrentStep(0);
      } else {
        setErrors(prev => ({ ...prev, general: error.message }));
      }
    }
  };

  // Render form based on current step
  const renderForm = () => {
    switch (currentStep) {
      case 0: // Basic Info
        return (
          <>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            <Text style={styles.sectionSubtitle}>Let's start with your basic details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor={Colors.dark.text + '80'}
                value={formData.name}
                onChangeText={(value) => updateFormData('name', value)}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                placeholderTextColor={Colors.dark.text + '80'}
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>
          </>
        );
        
      case 1: // Personal Details
        return (
          <>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <Text style={styles.sectionSubtitle}>Tell us a bit more about yourself</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your age"
                placeholderTextColor={Colors.dark.text + '80'}
                keyboardType="numeric"
                value={formData.age}
                onChangeText={(value) => updateFormData('age', value)}
              />
              {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    formData.gender === 'Male' && styles.radioButtonSelected
                  ]}
                  onPress={() => updateFormData('gender', 'Male')}
                >
                  <Text 
                    style={[
                      styles.radioButtonText,
                      formData.gender === 'Male' && styles.radioButtonTextSelected
                    ]}
                  >
                    Male
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    formData.gender === 'Female' && styles.radioButtonSelected
                  ]}
                  onPress={() => updateFormData('gender', 'Female')}
                >
                  <Text 
                    style={[
                      styles.radioButtonText,
                      formData.gender === 'Female' && styles.radioButtonTextSelected
                    ]}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    formData.gender === 'Other' && styles.radioButtonSelected
                  ]}
                  onPress={() => updateFormData('gender', 'Other')}
                >
                  <Text 
                    style={[
                      styles.radioButtonText,
                      formData.gender === 'Other' && styles.radioButtonTextSelected
                    ]}
                  >
                    Other
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
            </View>
          </>
        );
        
      case 2: // Physical Info
        return (
          <>
            <Text style={styles.sectionTitle}>Physical Information</Text>
            <Text style={styles.sectionSubtitle}>These details help us personalize your experience</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Height (cm)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your height in cm"
                placeholderTextColor={Colors.dark.text + '80'}
                keyboardType="numeric"
                value={formData.height}
                onChangeText={(value) => updateFormData('height', value)}
              />
              {errors.height && <Text style={styles.errorText}>{errors.height}</Text>}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your weight in kg"
                placeholderTextColor={Colors.dark.text + '80'}
                keyboardType="numeric"
                value={formData.weight}
                onChangeText={(value) => updateFormData('weight', value)}
              />
              {errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}
            </View>
          </>
        );
        
      case 3: // Security
        return (
          <>
            <Text style={styles.sectionTitle}>Security</Text>
            <Text style={styles.sectionSubtitle}>Set up your account security</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Create a password"
                  placeholderTextColor={Colors.dark.text + '80'}
                  secureTextEntry={!showPassword}
                  value={formData.password}
                  onChangeText={(value) => updateFormData('password', value)}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color={Colors.dark.text + '99'} />
                  ) : (
                    <Eye size={20} color={Colors.dark.text + '99'} />
                  )}
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Confirm your password"
                  placeholderTextColor={Colors.dark.text + '80'}
                  secureTextEntry={!showConfirmPassword}
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateFormData('confirmPassword', value)}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color={Colors.dark.text + '99'} />
                  ) : (
                    <Eye size={20} color={Colors.dark.text + '99'} />
                  )}
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </View>
          </>
        );
        
      case 4: // Preferences
        return (
          <>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <Text style={styles.sectionSubtitle}>Help us customize your experience</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Fitness Goal</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
                {FITNESS_GOALS.map((goal) => (
                  <TouchableOpacity
                    key={goal}
                    style={[
                      styles.optionButton,
                      formData.fitnessGoal === goal && styles.optionButtonSelected
                    ]}
                    onPress={() => updateFormData('fitnessGoal', goal)}
                  >
                    {formData.fitnessGoal === goal && (
                      <View style={styles.checkIcon}>
                        <Check color={Colors.dark.text} size={16} />
                      </View>
                    )}
                    <Text 
                      style={[
                        styles.optionButtonText,
                        formData.fitnessGoal === goal && styles.optionButtonTextSelected
                      ]}
                    >
                      {goal}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {showOtherFitnessGoal && (
                <View style={styles.otherInputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your fitness goal"
                    placeholderTextColor={Colors.dark.text + '80'}
                    value={otherFitnessGoal}
                    onChangeText={(value) => {
                      setOtherFitnessGoal(value);
                      updateFormData('fitnessGoal', value);
                    }}
                  />
                </View>
              )}
              {errors.fitnessGoal && <Text style={styles.errorText}>{errors.fitnessGoal}</Text>}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Dietary Preference</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
                {DIETARY_PREFERENCES.map((diet) => (
                  <TouchableOpacity
                    key={diet}
                    style={[
                      styles.optionButton,
                      formData.dietaryPreference === diet && styles.optionButtonSelected
                    ]}
                    onPress={() => updateFormData('dietaryPreference', diet)}
                  >
                    {formData.dietaryPreference === diet && (
                      <View style={styles.checkIcon}>
                        <Check color={Colors.dark.text} size={16} />
                      </View>
                    )}
                    <Text 
                      style={[
                        styles.optionButtonText,
                        formData.dietaryPreference === diet && styles.optionButtonTextSelected
                      ]}
                    >
                      {diet}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {showOtherDietaryPreference && (
                <View style={styles.otherInputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your dietary preference"
                    placeholderTextColor={Colors.dark.text + '80'}
                    value={otherDietaryPreference}
                    onChangeText={(value) => {
                      setOtherDietaryPreference(value);
                      updateFormData('dietaryPreference', value);
                    }}
                  />
                </View>
              )}
              {errors.dietaryPreference && <Text style={styles.errorText}>{errors.dietaryPreference}</Text>}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Any Serious Medical Issues (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter any medical conditions we should know about"
                placeholderTextColor={Colors.dark.text + '80'}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={formData.medicalIssues}
                onChangeText={(value) => updateFormData('medicalIssues', value)}
              />
            </View>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft color={Colors.dark.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Account</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressSteps}>
          {STEPS.map((step, index) => (
            <View key={index} style={styles.progressStep}>
              <View style={styles.progressStepContent}>
                <View 
                  style={[
                    styles.progressCircle,
                    index < currentStep && styles.progressCircleCompleted,
                    index === currentStep && styles.progressCircleActive
                  ]}
                >
                  {index < currentStep ? (
                    <View style={styles.checkmarkContainer}>
                      <Check size={16} color={Colors.dark.text} />
                    </View>
                  ) : (
                    <Text 
                      style={[
                        styles.progressNumber,
                        index === currentStep && styles.progressNumberActive,
                        index < currentStep && styles.progressNumberCompleted
                      ]}
                    >
                      {index + 1}
                    </Text>
                  )}
                </View>
                <Text 
                  style={[
                    styles.progressLabel,
                    index === currentStep && styles.progressLabelActive
                  ]}
                >
                  {step}
                </Text>
                {index < STEPS.length - 1 && (
                  <View 
                    style={[
                      styles.progressLine,
                      index < currentStep && styles.progressLineActive
                    ]}
                  />
                )}
              </View>
            </View>
          ))}
        </View>
      </View>
      
      <ScrollView style={styles.formScroll} contentContainerStyle={styles.formContainer}>
        {errors.general && <Text style={styles.generalError}>{errors.general}</Text>}
        
        {renderForm()}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.button,
              currentStep === STEPS.length - 1 ? styles.submitButton : {}
            ]} 
            onPress={handleNext}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {currentStep === STEPS.length - 1 ? 'Create Account' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Lock, Mail, Eye, EyeOff } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { styles } from '@/styles/components/LoginScreen.styles';

export default function LoginScreen() {
  const { signIn, isLoading } = useAuth();
  const params = useLocalSearchParams();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Handle success message and email from registration
    if (params.message) {
      setSuccessMessage(params.message as string);
    }
    if (params.email) {
      setEmail(params.email as string);
    }
  }, [params]);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await signIn(email, password);
    } catch (error: any) {
      setError(error.message);
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
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={Colors.dark.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
      </View>
      
      <View style={styles.formContainer}>
        {successMessage ? (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>{successMessage}</Text>
          </View>
        ) : null}
        
        {error ? (
          <View style={styles.errorMessage}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue your fitness journey</Text>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputIcon}>
            <Mail color={Colors.dark.text} size={20} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.dark.text + '80'}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              setError('');
            }}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputIcon}>
            <Lock color={Colors.dark.text} size={20} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.dark.text + '80'}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              setError('');
            }}
          />
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff color={Colors.dark.text} size={20} />
            ) : (
              <Eye color={Colors.dark.text} size={20} />
            )}
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.dark.text} />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Link href="/signup" asChild>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
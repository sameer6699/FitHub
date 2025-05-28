import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Lock, Mail } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  
  const { signIn, isLoading } = useAuth();

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      await signIn(email, password);
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={Colors.dark.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue your health journey</Text>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
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
            onChangeText={setEmail}
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
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
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
        
        <Text style={styles.testCredentials}>
          Test credentials: test@example.com / password
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.error,
    marginBottom: Layout.spacing.m,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.m,
    overflow: 'hidden',
  },
  inputIcon: {
    padding: Layout.spacing.m,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.dark.text,
    paddingVertical: Layout.spacing.m,
    paddingRight: Layout.spacing.m,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Layout.spacing.xl,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.accent,
  },
  loginButton: {
    backgroundColor: Colors.dark.accent,
    borderRadius: Layout.borderRadius.medium,
    paddingVertical: Layout.spacing.m,
    alignItems: 'center',
    marginBottom: Layout.spacing.l,
  },
  loginButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.dark.text,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Layout.spacing.l,
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
  testCredentials: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.dark.text + '80',
    textAlign: 'center',
  },
});
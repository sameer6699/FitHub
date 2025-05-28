import React, { createContext, useState, useContext, ReactNode } from 'react';
import { router } from 'expo-router';

// Define the shape of the user object
export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  fitnessGoal?: string;
  dietaryPreference?: string;
  medicalIssues?: string;
}

// Define the shape of the auth context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  isAuthenticated: boolean;
}

// Test user credentials
const TEST_USER: User = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  age: 30,
  gender: 'Male',
  height: 175,
  weight: 70,
  fitnessGoal: 'Weight Loss',
  dietaryPreference: 'Balanced',
  medicalIssues: '',
};

// Create the auth context
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, you would call an API here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (email === 'test@example.com' && password === 'password') {
        setUser(TEST_USER);
        router.replace('/(tabs)');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = () => {
    setUser(null);
    router.replace('/');
  };

  // Register function
  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    try {
      // In a real app, you would call an API here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Create a new user with the provided data
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9), // Generate a random ID
        name: userData.name || '',
        email: userData.email || '',
        age: userData.age,
        gender: userData.gender,
        height: userData.height,
        weight: userData.weight,
        fitnessGoal: userData.fitnessGoal,
        dietaryPreference: userData.dietaryPreference,
        medicalIssues: userData.medicalIssues,
      };
      
      setUser(newUser);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
        register,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
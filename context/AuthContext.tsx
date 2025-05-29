import React, { createContext, useState, useContext, ReactNode } from 'react';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, User, AuthResponse } from '@/utils/api';

// Define the shape of the auth context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  sessionId: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Initialize auth state
  React.useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const userData = await auth.validateToken(token);
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        await AsyncStorage.removeItem('token');
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await auth.login(email, password);
      await AsyncStorage.setItem('token', response.token);
      setUser(response.user);
      setSessionId(response.sessionId);
      if (isInitialized) {
        router.replace('/(tabs)');
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      const errorMessage = error.response?.data?.message || 'Invalid credentials';
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Sign Out',
            style: 'destructive',
            onPress: async () => {
              setIsLoading(true);
              try {
                const token = await AsyncStorage.getItem('token');
                if (token && sessionId) {
                  await auth.logout(token, sessionId);
                }
                await AsyncStorage.removeItem('token');
                setUser(null);
                setSessionId(null);
                
                if (isInitialized) {
                  router.replace({
                    pathname: '/login',
                    params: { signOut: 'true' }
                  });
                }
              } catch (error) {
                console.error('Sign out error:', error);
                Alert.alert('Error', 'Failed to sign out. Please try again.');
              } finally {
                setIsLoading(false);
              }
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  // Register function
  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    try {
      const response = await auth.register(userData);
      // Don't set user or token here since we want them to login
      if (isInitialized) {
        router.replace({
          pathname: '/login',
          params: { 
            message: 'Account created successfully! Please login to continue.',
            email: userData.email 
          }
        });
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Error creating account';
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        sessionId,
        signIn,
        signOut,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use your computer's local IP address instead of localhost
const API_URL = 'http://192.168.31.244:3000/api'; // Your actual local IP address

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

export interface AuthResponse {
  user: User;
  token: string;
  sessionId: string;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error getting token:', error);
  }
  return config;
});

export const auth = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },

  async register(userData: Partial<User> & { password: string }): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  async validateToken(token: string): Promise<User> {
    const response = await api.get<User>('/auth/validate', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async logout(token: string, sessionId: string): Promise<void> {
    await api.post('/auth/logout', { sessionId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}; 
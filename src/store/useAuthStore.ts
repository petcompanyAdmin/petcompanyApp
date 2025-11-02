import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import { User } from 'firebase/auth';

type UserProfile = {
  uid?: string;
  name?: string;
  email?: string;
  photoURL?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  saveTokens: (tokens: { idToken?: string; accessToken?: string }) => Promise<void>;
  getTokens: () => Promise<{ idToken: string, accessToken: string } | null>;
  clearAuth: () => Promise<void>;
}

const zustandStorage: any = {
  getItem: async (name: string) => {
    const value = await AsyncStorage.getItem(name);
    return value ?? null;
  },
  setItem: async (name: string, value: string) => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => set({ user }),

      saveTokens: async (tokens) => {
        try{
          await EncryptedStorage.setItem('auth_tokens', JSON.stringify(tokens));
        }catch (error){
          console.error('Error saving tokens', error);
        }
      },

      getTokens: async () => {
        try{
          const stored: any = await EncryptedStorage.getItem('auth_tokens');
          return stored ? JSON.parse(stored) : null
        }catch (error){
          console.error('Error fetching tokens', error);
        }
      },

      clearAuth: async () => {
        try{
          await EncryptedStorage.removeItem('auth_tokens');
          await AsyncStorage.removeItem('auth_storage');
          set({ user: null });
        }catch(error){
          console.error('Clear auth error', error);
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: zustandStorage,
      partialize: (state) => ({ user: state.user }),
    }
  )
)
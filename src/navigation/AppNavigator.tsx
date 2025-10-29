import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { useAuthStore } from '../store/useAuthStore';

export default function AppNavigator() {
  const { user } = useAuthStore();

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

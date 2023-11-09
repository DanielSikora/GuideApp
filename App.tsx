import React from 'react';
import { AuthProvider } from './components/AuthContext';

import { NavigationContainer } from '@react-navigation/native';
import AppStackNavigator from './components/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppStackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
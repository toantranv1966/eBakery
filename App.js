import React from 'react';
import { View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Navigator
import Main from './Navigators/Main';

// Screens
import Header from './Shared/Header';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <Main />
    </NavigationContainer>
  );
}

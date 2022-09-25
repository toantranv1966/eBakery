import React from 'react';
import { View, Text, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { TailwindProvider } from 'tailwindcss-react-native';

// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

// Navigator
import Main from './Navigators/Main';

// Screens
import Header from './Shared/Header';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </TailwindProvider>
    </Provider>
  );
}

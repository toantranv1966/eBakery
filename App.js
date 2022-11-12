import React from 'react';
import { View, Text, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { TailwindProvider } from 'tailwindcss-react-native';

// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

// Context API
import Auth from './Context/store/Auth';

// Navigator
import Main from './Navigators/Main';

// Screens
import Header from './Shared/Header';

// Format Number
import numeral from 'numeral';
import 'numeral/locales/vi';
numeral.locale('vi');

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <TailwindProvider>
          <NavigationContainer>
            <Header />
            <Main />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </NavigationContainer>
        </TailwindProvider>
      </Provider>
    </Auth>
  );
}

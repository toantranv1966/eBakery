import React, { useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

// Stacks
import HomeNavigator from './HomeNavigator';
import CartNavigator from './CartNavigator';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';

import CartIcon from '../Shared/CartIcon';
import AuthGlobal from '../Context/store/AuthGlobal';

// Edit Redux
// import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
const Tab = createMaterialBottomTabNavigator();
const ICON_SIZE = 30;

const Main = (props) => {
  const context = useContext(AuthGlobal);

  const cartItems = useSelector((state) => state.shoppingReducer.addedProducts);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      barStyle={{ backgroundColor: '#ffffff' }}
      activeColor="#ffce00"
      inactiveColor="#000000"
      backBehavior="history"
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={ICON_SIZE}
              color={color}
            />
          ),
          tabBarColor: 'gray',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          title: 'Giỏ hàng',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'cart' : 'cart-outline'}
              size={ICON_SIZE}
              color={color}
            />
          ),
          tabBarBadge: cartItems?.length,
          tabBarColor: 'gray',
        }}
      />
      {context.stateUser.user.isAdmin == true ? (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            title: 'Admin',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? 'settings' : 'settings-outline'}
                size={24}
                color="color"
              />
            ),
            tabBarColor: 'gray',
          }}
        />
      ) : null}
      <Tab.Screen
        name="User Profile"
        component={UserNavigator}
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'account-settings' : 'account-settings-outline'}
              size={ICON_SIZE}
              color={color}
            />
          ),
          tabBarColor: 'gray',
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;

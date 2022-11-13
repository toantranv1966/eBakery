import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { View } from 'react-native';

// Stacks
import HomeNavigator from './HomeNavigator';
import CartNavigator from './CartNavigator';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';

import CartIcon from '../Shared/CartIcon';
import AuthGlobal from '../Context/store/AuthGlobal';

import { connect } from 'react-redux';
// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
const ICON_SIZE = 30;

const Main = (props) => {
  const context = useContext(AuthGlobal);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      barStyle={{ backgroundColor: '#ffffff' }}
      activeColor="#ffffff"
      inactiveColor="#000000"
      backBehavior="history"
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={ICON_SIZE}
              color={color}
            />
          ),
          tabBarColor: '#ff4757',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'cart' : 'cart-outline'}
              size={ICON_SIZE}
              color={color}
            />
          ),
          tabBarBadge: props.cartItems?.length,
          tabBarColor: '#ff6348',
        }}
      />
      {context.stateUser.user.isAdmin == true ? (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            title: 'Admin',
            tabBarIcon: ({ focused, color }) => (
              <AntDesign name="setting" size={24} color="black" />
            ),

            tabBarColor: '#ff4757',
          }}
        />
      ) : null}
      <Tab.Screen
        name="User Profile"
        component={UserNavigator}
        options={{
          title: 'User',
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? 'account' : 'account-outline'}
              size={ICON_SIZE}
              color={color}
            />
          ),
          tabBarColor: '#ff6348',
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(Main);

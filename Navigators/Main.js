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

// Edit Redux
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
// const Tab = createBottomTabNavigator();
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
          title: 'Home',
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
          title: 'Cart',
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
              <AntDesign name="setting" size={24} color="black" />
            ),

            tabBarColor: 'gray',
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
          tabBarColor: 'gray',
        }}
      />
    </Tab.Navigator>
  );
};

// const mapStateToProps = (state) => {
//   const { cartItems } = state;
//   return {
//     cartItems: cartItems,
//   };
// };

// export default connect(mapStateToProps)(Main);
export default Main;

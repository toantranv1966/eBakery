import React, { useContext, useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Button,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import OrderCard from '../../Shared/OrderCard';
import { Container } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.actions';

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate('Login');
      }

      AsyncStorage.getItem('jwt')
        .then((res) => {
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => setUserProfile(user.data));
        })
        .catch((error) => console.log(error));

      axios
        .get(`${baseURL}orders`)
        .then((x) => {
          const data = x.data;
          console.log(data);
          const userOrders = data.filter(
            (order) => order.user._id === context.stateUser.user.userId
          );
          setOrders(userOrders);
        })
        .catch((error) => console.log(error));

      return () => {
        setUserProfile();
        setOrders();
      };
    }, [context.stateUser.isAuthenticated])
  );

  console.log('userProfile:', userProfile);
  console.log('Orders', orders);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        pagingEnabled
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.subContainer}
      >
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.name : ''}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ''}
          </Text>
          <Text style={{ marginTop: 20 }}>
            Phone: {userProfile ? userProfile.phone : ''}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <EasyButton
            primary
            medium
            onPress={() => [
              AsyncStorage.removeItem('jwt'),
              logoutUser(context.dispatch),
            ]}
          >
            <Text style={{ color: 'white' }}>Sign Out</Text>
          </EasyButton>
        </View>
        <View style={styles.order}>
          <Text style={{ fontSize: 20 }}>My Orders</Text>
          <View>
            {orders ? (
              orders.map((x) => {
                return <OrderCard key={x.id} {...x} />;
              })
            ) : (
              <View style={styles.order}>
                <Text> You have no orders </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  subContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
});

export default UserProfile;

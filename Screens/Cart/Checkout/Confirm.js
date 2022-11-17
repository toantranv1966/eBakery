import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Button } from 'react-native';
import {
  ScrollView,
  Box,
  Heading,
  Avatar,
  HStack,
  VStack,
  Spacer,
  Center,
  NativeBaseProvider,
  extendTheme,
  Text,
  Image,
  FlatList,
} from 'native-base';
import EasyButton from '../../../Shared/StyledComponents/EasyButton';

const newColorTheme = {
  brand: {
    900: '#5B8DF6',
    800: '#ffffff',
    700: '#cccccc',
  },
};

const theme = extendTheme({
  colors: newColorTheme,
});

import { connect, Connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/cartActions';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import baseURL from '../../../assets/common/baseUrl';

var { width, height } = Dimensions.get('window');

const Confirm = (props) => {
  const [user, setUser] = useState();

  const finalOrder = props.route.params;

  const confirmOrder = () => {
    const order = finalOrder.order.order;
    let orderItemsN = [];
    order.orderItems.forEach((item) => {
      orderItemsN.push({
        ['product']: item.product.id,
        ['quantity']: item.quantity,
      });
    });

    let orderUpd = {
      ['city']: order.city,
      ['country']: order.country,
      ['dateOrdered']: order.dateOrdered,
      ['orderItems']: orderItemsN,
      ['phone']: order.phone,
      ['shippingAddress1']: order.shippingAddress1,
      ['shippingAddress2']: order.shippingAddress2,
      ['zip']: order.zip,
      ['user']: order.user,
      ['status']: order.status,
    };

    axios
      .post(`${baseURL}orders`, orderUpd)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Order Completed',
            text2: '',
          });
          console.log('OrderUpd', orderUpd);
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate('Cart');
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again',
        });
      });
  };

  return (
    <NativeBaseProvider theme={theme}>
      <Box flex={1} px="3">
        <Heading fontSize="xl" p="4" pb="3" mt="5">
          Confirm Order
        </Heading>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.titleContainer}>
            {props.route.params ? (
              <View style={{ borderWidth: 1, borderColor: 'orange' }}>
                <Text style={styles.title}>Shipping to:</Text>
                <View style={{ padding: 8 }}>
                  <Text>
                    Address: {finalOrder.order.order.shippingAddress1}
                  </Text>
                  <Text>
                    Address2: {finalOrder.order.order.shippingAddress2}
                  </Text>
                  <Text>City: {finalOrder.order.order.city}</Text>
                  <Text>Zip Code: {finalOrder.order.order.zip}</Text>
                  <Text>Country: {finalOrder.order.order.country}</Text>
                </View>
                <Text style={styles.title}>Items:</Text>

                {finalOrder.order.order.orderItems.map((x) => {
                  return (
                    <HStack space={1}>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          alignContent: 'center',
                          alignItems: 'center',
                          padding: 10,
                        }}
                      >
                        <Avatar
                          size="48px"
                          source={{
                            uri: x.product.image,
                          }}
                        />
                        <Text style={{ marginLeft: 5 }}>{x.product.name}</Text>
                        <Text style={{ marginLeft: 20 }}>
                          {x.product.price}
                        </Text>
                      </View>
                    </HStack>
                  );
                })}
              </View>
            ) : null}
            <View style={{ alignItems: 'center', margin: 20 }}>
              <EasyButton primary medium onPress={confirmOrder}>
                <Text style={{ color: 'white' }}>Place order</Text>
              </EasyButton>
            </View>
          </View>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  title: {
    alignSelf: 'center',
    margin: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default connect(null, mapDispatchToProps)(Confirm);

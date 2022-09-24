import React from 'react';
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
} from 'native-base';

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

var { width, height } = Dimensions.get('window');

const Confirm = (props) => {
  const confirmOrder = () => {
    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate('Cart');
    }, 500);
  };

  const confirm = props.route.params;

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
                  <Text>Address: {confirm.order.order.shippingAddress1}</Text>
                  <Text>Address2: {confirm.order.order.shippingAddress2}</Text>
                  <Text>City: {confirm.order.order.city}</Text>
                  <Text>Zip Code: {confirm.order.order.zip}</Text>
                  <Text>Country: {confirm.order.order.country}</Text>
                </View>
                <Text style={styles.title}>Items:</Text>
                {confirm.order.order.orderItems.map((x) => {
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
              <Button title={'Place order'} onPress={confirmOrder} />
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

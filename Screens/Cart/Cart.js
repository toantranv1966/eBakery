import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Text,
  Left,
  Right,
  H1,
  ListItem,
  Thumbnail,
  Body,
  NativeBaseProvider,
  extendTheme,
  Heading,
  FlatList,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Box,
  Icon,
} from 'native-base';
import numeral from 'numeral';

import { SwipeListView } from 'react-native-swipe-list-view';
import { AntDesign } from '@expo/vector-icons';
import CartItem from './CartItem';

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

var { height, width } = Dimensions.get('window');

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

const Cart = (props) => {
  var total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });
  return (
    <NativeBaseProvider theme={theme}>
      <>
        {props.cartItems.length ? (
          <Box>
            <SwipeListView
              data={props.cartItems}
              renderItem={(data) => <CartItem item={data} />}
              renderHiddenItem={(data) => (
                <View style={styles.hiddenContainer}>
                  <TouchableOpacity
                    style={styles.hiddenButton}
                    onPress={() => props.removeFromCart(data.item)}
                  >
                    <Icon
                      as={<AntDesign name="delete" size={30} color="black" />}
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </TouchableOpacity>
                </View>
              )}
              disableRightSwipe={true}
              previewOpenDelay={3000}
              friction={1000}
              tension={40}
              leftOpenValue={75}
              stopLeftSwipe={75}
              rightOpenValue={-75}
            />
          </Box>
        ) : (
          <View style={styles.emptyContainer}>
            <Text>Looks like your cart is empty</Text>
            <Text>Add products to your cart to get started</Text>
          </View>
        )}
      </>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.price}>{numeral(total).format('0,0$')}</Text>
        </View>
        <View>
          <Button title="Clear" onPress={() => props.clearCart()} />
        </View>
        <View>
          <Button
            title="Checkout"
            onPress={() => props.navigation.navigate('Checkout')}
          />
        </View>
      </View>
    </NativeBaseProvider>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

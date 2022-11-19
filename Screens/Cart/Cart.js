import React, { useState, useEffect, useContext } from 'react';
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

import EasyButton from '../../Shared/StyledComponents/EasyButton';

// import { connect } from 'react-redux';
// import * as actions from '../../Redux/Actions/cartActions';
// Edit Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  decreaseFromCart,
  emptyCart,
  removeFromCart,
} from '../../modules/actions';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from 'react-native';

// Context
import AuthGlobal from '../../Context/store/AuthGlobal';

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
  const context = useContext(AuthGlobal);

  // Edit Redux
  // var total = 0;
  // props.cartItems.forEach((cart) => {
  //   return (total += cart.product.price);
  // });
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.shoppingReducer.addedProducts);
  var total = 0;
  cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });
  return (
    <NativeBaseProvider theme={theme}>
      <>
        {cartItems.length ? (
          <Box>
            {/* <SwipeListView
              data={cartItems}
              renderItem={(data) => <CartItem item={data} />}
              renderHiddenItem={(data) => (
                <View style={styles.hiddenContainer}>
                  <TouchableOpacity
                    style={styles.hiddenButton}
                    // onPress={() => props.removeFromCart(data.item)}
                    onPress={() => dispatch(removeFromCart(data.item.id))}
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
            /> */}
            <FlatList
              data={cartItems}
              renderItem={({ item }) => (
                <Box
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: 'muted.50',
                  }}
                  borderColor="muted.800"
                  pl={['0', '4']}
                  pr={['0', '5']}
                  py="2"
                >
                  <HStack space={[2, 3]} justifyContent="space-between">
                    <Avatar
                      size="48px"
                      source={{
                        uri: item.product.image,
                      }}
                    />
                    <VStack>
                      <Text
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        bold
                      >
                        {item.product.name}
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: 'warmGray.200',
                        }}
                      >
                        {item.product.price}
                      </Text>
                    </VStack>
                    <Spacer />
                    <TouchableOpacity
                      // onPress={() => props.removeFromCart(data.item)}
                      onPress={() => dispatch(removeFromCart(item.product.id))}
                    >
                      <Icon
                        as={<AntDesign name="delete" size={30} color="black" />}
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </TouchableOpacity>
                  </HStack>
                </Box>
              )}
              keyExtractor={(item) => item.id}
            />
            <View style={styles.bottomContainer}>
              <View>
                <Text style={styles.price}>
                  {numeral(total).format('0,0$')}
                </Text>
              </View>
              <View>
                <EasyButton danger medium onPress={() => dispatch(emptyCart())}>
                  <Text style={{ color: 'white' }}>Clear</Text>
                </EasyButton>
              </View>
              <View>
                <EasyButton
                  primary
                  medium
                  onPress={() => props.navigation.navigate('Checkout')}
                >
                  <Text style={{ color: 'white' }}>Checkout</Text>
                </EasyButton>
              </View>
            </View>
          </Box>
        ) : (
          <View style={styles.emptyContainer}>
            <Text>Looks like your cart is empty</Text>
            <Text>Add products to your cart to get started</Text>
          </View>
        )}
      </>
    </NativeBaseProvider>
  );
};

// const mapStateToProps = (state) => {
//   const { cartItems } = state;
//   return {
//     cartItems: cartItems,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     clearCart: () => dispatch(actions.clearCart()),
//     removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
//   };
// };

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
    top: height - 220,
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

// export default connect(mapStateToProps, mapDispatchToProps)(Cart);
export default Cart;

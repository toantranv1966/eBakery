import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  FlatList,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import numeral from 'numeral';
import _ from 'lodash';

import CartItem from './CartItem';

import Separator from '../../components/Seperator';

// Edit Redux
import { useSelector } from 'react-redux';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from 'react-native';

// Context
import AuthGlobal from '../../Context/store/AuthGlobal';

const Cart = ({ props, navigation }) => {
  const context = useContext(AuthGlobal);

  // Edit Redux
  const cartItems = useSelector((state) => state.shoppingReducer.addedProducts);

  const total = _.sumBy(cartItems, (item) => {
    return item.product.price * item.quantity;
  });
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="black"
          onPress={() => navigation.goBack()}
        />

        <Text style={styles.headerTitle}>Giỏ hàng</Text>
      </View>
      {cartItems.length > 0 ? (
        <>
          <ScrollView>
            <View style={styles.foodList}>
              <FlatList
                data={cartItems}
                renderItem={(data) => <CartItem item={data} />}
                keyExtractor={(item) => item.id}
              />
            </View>

            <View style={styles.promoCodeContainer}>
              <View style={styles.rowAndCenter}>
                <Entypo name="ticket" size={30} color={Colors.DEFAULT_YELLOW} />
                <Text style={styles.promoCodeText}>Nhập mã khuyến mãi</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={Colors.DEFAULT_BLACK}
              />
            </View>

            <View style={styles.amountContainer}>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Thành tiền</Text>
                <Text style={styles.amountText}>
                  {numeral(total).format('0,0$')}
                </Text>
              </View>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Giảm giá</Text>
                <Text style={styles.amountText}>
                  $ {cartItems?.metaData?.discount?.toFixed(2)}
                </Text>
              </View>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Phí giao hàng</Text>
                <Text
                  style={{ ...styles.amountText, color: Colors.DEFAULT_GREEN }}
                >
                  Miễn phí
                </Text>
              </View>
            </View>

            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Tổng thanh toán</Text>
              <Text style={styles.totalText}>
                {numeral(total).format('0,0$')}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Checkout')}
            >
              <View style={styles.rowAndCenter}>
                <Ionicons
                  name="cart-outline"
                  color={Colors.DEFAULT_WHITE}
                  size={20}
                />
                <Text style={styles.checkoutText}>Thanh toán</Text>
              </View>
              <Text style={styles.checkoutText}>
                {numeral(total).format('0,0$')}
              </Text>
            </TouchableOpacity>

            <Separator height={setHeight(9)} />
          </ScrollView>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image
            style={styles.emptyCartImage}
            source={require('../../assets/images/empty_cart.png')}
            resizeMode="contain"
          />
          <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
          <Text style={styles.emptyCartSubText}>
            Đặt món và thưởng thức nào!
          </Text>
          <TouchableOpacity
            style={styles.addButtonEmpty}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="plus" color={Colors.DEFAULT_WHITE} size={20} />
            <Text style={styles.addButtonEmptyText}>Đặt món</Text>
          </TouchableOpacity>
          <Separator height={setHeight(15)} />
        </View>
      )}
    </View>
  );
};

const { height, width } = Dimensions.get('window');

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const Colors = {
  DEFAULT_BLACK: '#0E122B',
  DEFAULT_GREEN: '#0A8791',
  DEFAULT_YELLOW: '#ffce00',
  DEFAULT_GREY: '#C2C2CB',
  DEFAULT_WHITE: '#FFFFFF',
  DEFAULT_RED: '#F53920',
  SECONDARY_RED: '#FF6F59',
  SECONDARY_WHITE: '#F8F8F8',
  SECONDARY_GREEN: '#24C869',
  SECONDARY_BLACK: '#191d35',
  LIGHT_GREEN: '#CEE8E7',
  LIGHT_GREY: '#F8F7F7',
  LIGHT_GREY2: '#EAEAEA',
  LIGHT_YELLOW: '#FCE6CD',
  LIGHT_RED: '#FFC8BF',
  FABEBOOK_BLUE: '#4A61A8',
  GOOGLE_BLUE: '#53A0F4',
  INACTIVE_GREY: '#A3A3A3',
  DARK_ONE: '#121212',
  DARK_TWO: '#181818',
  DARK_THREE: '#404040',
  DARK_FOUR: '#282828',
  DARK_FIVE: '#B3B3B3',
};

const Fonts = {
  POPPINS_BLACK: 'Poppins-Black',
  POPPINS_BOLD: 'Poppins-Bold',
  POPPINS_EXTRA_BOLD: 'Poppins-ExtraBold',
  POPPINS_EXTRA_LIGHT: 'Poppins-ExtraLight',
  POPPINS_LIGHT: 'Poppins-Light',
  POPPINS_MEDIUM: 'Poppins-Medium',
  POPPINS_REGULAR: 'Poppins-Regular',
  POPPINS_SEMI_BOLD: 'Poppins-SemiBold',
  POPPINS_THIN: 'Poppins-Thin',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: setWidth(80),
    textAlign: 'center',
  },
  foodList: {
    marginHorizontal: setWidth(4),
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: setWidth(4),
    paddingVertical: 15,
    marginTop: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
  },
  promoCodeText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
    marginLeft: 10,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountContainer: {
    marginHorizontal: setWidth(4),
    paddingVertical: 20,
    borderBottomWidth: 0.5,
  },
  amountSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  amountLabelText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_GREEN,
  },
  amountText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  totalContainer: {
    marginHorizontal: setWidth(4),
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 20 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  checkoutButton: {
    flexDirection: 'row',
    width: setWidth(80),
    backgroundColor: Colors.DEFAULT_YELLOW,
    alignSelf: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    height: setHeight(7),
    marginTop: 10,
  },
  checkoutText: {
    fontSize: 16,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 16 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 8,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 30,
    fontFamily: Fonts.POPPINS_LIGHT,
    lineHeight: 30 * 1.4,
    color: Colors.DEFAULT_GREEN,
  },
  emptyCartSubText: {
    fontSize: 12,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: Colors.INACTIVE_GREY,
  },
  addButtonEmpty: {
    flexDirection: 'row',
    backgroundColor: Colors.DEFAULT_YELLOW,
    borderRadius: 8,
    paddingHorizontal: setWidth(4),
    paddingVertical: 5,
    marginTop: 10,
    justifyContent: 'space-evenly',
    elevation: 3,
    alignItems: 'center',
  },
  addButtonEmptyText: {
    fontSize: 12,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 10,
  },
  emptyCartImage: {
    height: setWidth(60),
    width: setWidth(60),
  },
});

export default Cart;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import numeral from 'numeral';

// Add Redux
import { useDispatch } from 'react-redux';
import { addToCart, decreaseFromCart } from '../../modules/actions';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const data = props.item.item;
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.image}
          source={{
            uri: data.product.image,
          }}
        />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <TouchableOpacity>
          <Text numberOfLines={1} style={styles.titleText}>
            {data.product.name}
          </Text>
          <Text numberOfLines={2} style={styles.descriptionText}>
            {data.product.description}
          </Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.priceText}>
            {numeral(data.product.price).format('0,0$')}
          </Text>
          <View style={styles.itemAddContainer}>
            {data.quantity > 0 ? (
              <>
                <AntDesign
                  name="minus"
                  color={Colors.DEFAULT_YELLOW}
                  size={25}
                  onPress={() => dispatch(decreaseFromCart(data.product.id, 1))}
                />
                <Text style={styles.itemCountText}>{data.quantity}</Text>
              </>
            ) : null}

            <AntDesign
              name="plus"
              color={Colors.DEFAULT_YELLOW}
              size={25}
              onPress={() => dispatch(addToCart(data.product, 1))}
            />
          </View>
        </View>
      </View>
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
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
    backgroundColor: Colors.LIGHT_GREY,
  },
  image: {
    height: 100,
    width: 100,
    margin: 6,
    borderRadius: 8,
  },
  detailsContainer: {
    marginHorizontal: 5,
  },
  titleText: {
    width: setWidth(60),
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    marginBottom: 8,
  },
  descriptionText: {
    width: setWidth(60),
    color: Colors.DEFAULT_GREY,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    marginBottom: 8,
  },
  priceText: {
    color: Colors.DEFAULT_YELLOW,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 18,
    lineHeight: 14 * 1.4,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  itemAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  itemCountText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    marginHorizontal: 8,
  },
});

export default CartItem;

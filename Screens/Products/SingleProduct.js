import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import TrafficLight from '../../Shared/StyledComponents/TrafficLight';
import numeral from 'numeral';

// Edit Redux
import { useDispatch } from 'react-redux';
import { addToCart } from '../../modules/actions';

const SingleProduct = (props) => {
  const dispatch = useDispatch();
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState('');

  useEffect(() => {
    if (props.route.params.item.countInStock == 0) {
      setAvailability(<TrafficLight unavailable></TrafficLight>);
      setAvailabilityText('Tạm hết món');
    } else if (props.route.params.item.countInStock <= 5) {
      setAvailability(<TrafficLight limited></TrafficLight>);
      setAvailabilityText('Số lượng hạn chế');
    } else {
      setAvailability(<TrafficLight available></TrafficLight>);
      setAvailabilityText('Món có sẵn');
    }

    return () => {
      setAvailability(null);
      setAvailabilityText('');
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentHeader}>{item.name}</Text>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{ marginRight: 10 }}>Tồn kho: {availabilityText}</Text>
            {availability}
          </View>
          <Text>{item.description}</Text>
        </View>
      </ScrollView>

      {/* Bottom */}
      {item.countInStock > 0 ? (
        <View style={styles.bottomContainer}>
          <View style={styles.itemAddContainer}>
            <Text style={styles.itemCountText}>
              {numeral(item.price).format('0,0$')}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => {
              dispatch(addToCart(item, 1));
              Toast.show({
                topOffset: 60,
                type: 'success',
                text1: `${item.name} đã thêm món vào giỏ hàng`,
                text2: 'Đi tới giỏ hàng để hoàn tất đơn hàng',
              });
            }}
          >
            <Text style={styles.cartButtonText}>Thêm vào giỏ</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.itemAddContainer, setWidth(100)]}>
          <Text style={[styles.itemCountText]}>Tạm hết món</Text>
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
    position: 'relative',
    height: '100%',
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeader: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  price: {
    fontSize: 24,
    margin: 20,
    color: 'red',
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  availability: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  // Bottom
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  itemAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY2,
    height: setHeight(6),
    width: setWidth(50),
    justifyContent: 'center',
    borderRadius: 8,
  },
  itemCountText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 18,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    marginHorizontal: 8,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: Colors.DEFAULT_YELLOW,
    height: setHeight(6),
    width: setWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cartButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
});

export default SingleProduct;

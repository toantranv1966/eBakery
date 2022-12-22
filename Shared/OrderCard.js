import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Select,
  CheckIcon,
  NativeBaseProvider,
  extendTheme,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import TrafficLight from './StyledComponents/TrafficLight';
import EasyButton from './StyledComponents/EasyButton';
import Toast from 'react-native-toast-message';

import { AsyncStorage } from 'react-native';
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';

const codes = [
  { name: 'đang chờ', code: '3' },
  { name: 'vận chuyển', code: '2' },
  { name: 'đã giao hàng', code: '1' },
];

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

const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    if (props.editMode) {
      AsyncStorage.getItem('jwt')
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));
    }

    if (props.status == '3') {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText('đang chờ');
      setCardColor('#E74C3C');
    } else if (props.status == '2') {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText('vận chuyển');
      setCardColor('#F1C40F');
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText('đã giao hàng');
      setCardColor('#2ECC71');
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItems: props.orderItems,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
    };

    axios
      .put(`${baseURL}orders/${props.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Đã cập nhật đơn.',
            text2: '',
          });
          setTimeout(() => {
            props.navigation.navigate('Products');
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Đã xảy ra sự cố',
          text2: 'Vui lòng thử lại',
        });
      });
  };

  return (
    <NativeBaseProvider theme={theme}>
      <View style={[{ backgroundColor: cardColor }, styles.container]}>
        <View style={styles.title}>
          <Text>Đơn hàng số: #{props.id}</Text>
        </View>
        <View style={{ margin: 10 }}>
          <Text>
            Trạng thái {statusText} {orderStatus}
          </Text>
          <Text>
            Địa chỉ: {props.shippingAddress1}
            {props.shippingAddress2}
          </Text>
          <Text>Thành phố: {props.city}</Text>
          <Text>Quốc gia: {props.country}</Text>
          <Text>Ngày đặt hàng : {props.dateOrdered.split('T')[0]}</Text>
          <View style={styles.priceContainer}>
            <Text>Tổng tiền:</Text>
            <Text style={styles.price}>$ {props.totalPrice}</Text>
          </View>

          {props.editMode ? (
            <View>
              <Select
                style={styles.input}
                minWidth="300"
                defaultValue={''}
                selectedValue={statusChange}
                placeholder="Thay đổi trạng thái"
                placeholderStyle={{ color: '#007aff' }}
                placeholderIconColor="#007aff"
                onValueChange={(e) => setStatusChange(e)}
                accessibilityLabel="Set Status"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="15" />,
                }}
              >
                {codes.map((c) => {
                  return (
                    <Select.Item key={c.code} label={c.name} value={c.code} />
                  );
                })}
              </Select>
              <EasyButton secondary large onPress={() => updateOrder()}>
                <Text style={{ color: 'white' }}>Cập nhật</Text>
              </EasyButton>
            </View>
          ) : null}
        </View>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: '#62B1F6',
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  price: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderCard;

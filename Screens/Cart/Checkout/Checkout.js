import React, { useEffect, useState, useContext } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import {
  Item,
  Select,
  CheckIcon,
  NativeBaseProvider,
  extendTheme,
  FormControl,
  WarningOutlineIcon,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from '../../../Shared/Form/FormContainer';
import Input from '../../../Shared/Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { connect } from 'react-redux';

import countries from '../../../assets/countries.json';

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

const Checkout = (props) => {
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);

    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    let order = {
      city,
      country,
      dateOrder: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      zip,
    };
    console.log('orders', order);

    props.navigation.navigate('Payment', { order: order });
  };

  return (
    <NativeBaseProvider theme={theme}>
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
      >
        <FormContainer title={'Shipping Address'}>
          <Input
            placeholder={'Phone'}
            name={'phone'}
            value={phone}
            keyboardType={'numeric'}
            onChangeText={(text) => setPhone(text)}
          />
          <Input
            placeholder={'Shipping Address 1'}
            name={'ShippingAddress1'}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <Input
            placeholder={'Shipping Address 2'}
            name={'ShippingAddress2'}
            value={address2}
            onChangeText={(text) => setAddress2(text)}
          />
          <Input
            placeholder={'City'}
            name={'city'}
            value={city}
            onChangeText={(text) => setCity(text)}
          />
          <Input
            placeholder={'Zip Code'}
            name={'zip'}
            value={zip}
            keyboardType={'numeric'}
            onChangeText={(text) => setZip(text)}
          />
          <Select
            style={styles.input}
            minWidth="300"
            defaultValue={'Viet Nam'}
            selectedValue={country}
            placeholder="Select your country"
            placeholderStyle={{ color: '#007aff' }}
            placeholderIconColor="#007aff"
            onValueChange={(e) => setCountry(e)}
            accessibilityLabel="Choose Country"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="15" />,
            }}
          >
            {countries.map((c) => {
              return <Select.Item key={c.name} label={c.name} value={c.name} />;
            })}
          </Select>

          <View style={{ width: '80%', alignItems: 'center' }}>
            <Button title="Confirm" onPress={() => checkOut()} />
          </View>
        </FormContainer>
      </KeyboardAwareScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 60,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: '#ffce00',
  },
});

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(Checkout);

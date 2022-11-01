import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  Radio,
  Right,
  Left,
  Select,
  Icon,
  Body,
  Title,
  NativeBaseProvider,
  extendTheme,
  HStack,
  FlatList,
  Box,
  Heading,
  Avatar,
  VStack,
  Spacer,
  Center,
  FormControl,
  WarningOutlineIcon,
  CheckIcon,
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

const methods = [
  {
    name: 'Cash on Delivery',
    value: 1,
    avatarUrl:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    name: 'Bank Transfer',
    value: 2,
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
  },
  {
    name: 'Cash Payment',
    value: 3,
    avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
  },
];

const paymentCards = [
  { name: 'Wallet', value: 1 },
  { name: 'Visa', value: 2 },
  { name: 'MasterCard', value: 3 },
  { name: 'Other', value: 4 },
];

const Payment = (props) => {
  const [groupValue, setGroupValue] = React.useState('1');
  const order = props.route.params;

  const [selected, setSelected] = useState(1);
  const [card, setCard] = useState(null);

  const checkOut = () => {
    // props.navigation.navigate('Payment', { order: order });
    props.navigation.navigate('Confirm', { order });
    console.log('order', order);
    console.log('selected', selected);
    console.log('card', card);
  };
  return (
    <NativeBaseProvider theme={theme}>
      <Container>
        <FormControl isInvalid>
          <FormControl.Label
            _text={{
              fontSize: 'lg',
              bold: true,
              marginLeft: 10,
            }}
          >
            Choose your payment method
          </FormControl.Label>
          <Radio.Group
            name="exampleGroup"
            accessibilityLabel="select payment"
            defaultValue={selected}
            onChange={(value) => {
              setSelected(value || '');
            }}
          >
            <Radio value="1" my="1">
              Cash on Delivery
            </Radio>
            <Radio value="2" my="1">
              Bank Transfer
            </Radio>
            <Radio value="3" my="1">
              Cash Payment
            </Radio>
          </Radio.Group>
        </FormControl>
        {selected == 3 ? (
          <Select
            style={styles.input}
            minWidth="300"
            defaultValue={'Wallet'}
            selectedValue={card}
            placeholder="Select your card"
            placeholderStyle={{ color: '#007aff' }}
            placeholderIconColor="#007aff"
            onValueChange={(e) => setCard(e)}
            accessibilityLabel="Choose Card"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="15" />,
            }}
          >
            {paymentCards.map((c) => {
              return <Select.Item key={c.name} label={c.name} value={c.name} />;
            })}
          </Select>
        ) : null}
        <View style={{ marginTop: 60, alignSelf: 'center' }}>
          <EasyButton primary medium onPress={() => checkOut()}>
            <Text style={{ color: 'white' }}>Confirm</Text>
          </EasyButton>
        </View>
      </Container>
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
    borderColor: 'orange',
  },
});

export default Payment;

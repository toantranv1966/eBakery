import React from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet } from 'react-native';
import numeral from 'numeral';

const CartItem = (props) => {
  const data = props.item.item;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.productContainer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.price}>{numeral(data.price).format('0,0$')}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
  },
  productContainer: {
    flexDirection: 'row',
    height: 54,
    alignItems: 'center',
  },
  name: {
    marginHorizontal: 8,
  },
  price: {
    marginRight: 8,
  },
  quantity: {
    color: 'red',
    marginRight: 8,
  },
});

export default CartItem;

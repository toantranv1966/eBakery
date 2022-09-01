import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';

import ProductCart from './ProductCard';

var { width } = Dimensions.get('window');

const ProductList = (props) => {
  const { item } = props;
  return (
    <TouchableOpacity
      style={{ width: '50%' }}
      // onPress={() =>
      //     props.navigation.navigate("Product Detail", { item: item})
      // }
    >
      <View style={{ width: width / 2, backgroundColor: 'gainsboro' }}></View>
      <ProductCart {...item} />
    </TouchableOpacity>
  );
};

export default ProductList;

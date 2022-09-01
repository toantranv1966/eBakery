import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  NativeBaseProvider,
  Container,
  Header,
  Icon,
  Item,
  Input,
  Text,
  VStack,
  Heading,
} from 'native-base';

import ProductList from './ProductList';

const data = require('../../assets/data/products.json');

var { height } = Dimensions.get('window');

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  // Search Function
  const [productsFiltered, setProductsFiltered] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);

    return () => {
      setProducts([]);
    };
  }, []);

  return (
    <NativeBaseProvider>
      <Container>
        <VStack w="100%" space={5} alignSelf="center">
          <Input
            placeholder="Search"
            // onFocus={}
            // onChangeText={(text)=>}
            width="100%"
            borderRadius="4"
            py="3"
            px="1"
            fontSize="14"
          />
        </VStack>
        <View>
          <Text>Product Container</Text>
          <View style={styles.listContainer}>
            <FlatList
              // horizontal
              numColumns={2}
              data={products}
              renderItem={({ item }) => (
                <ProductList key={item.id} item={item} />
              )}
              keyExtractor={(item) => item.name}
            />
          </View>
        </View>
      </Container>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductContainer;

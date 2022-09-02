import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions,
  Text,
  TextInput,
} from 'react-native';
import {
  NativeBaseProvider,
  Container,
  Header,
  Icon,
  Item,
  Input,
  VStack,
  Heading,
  Stack,
} from 'native-base';

import ProductList from './ProductList';
import SearchProduct from './SearchedProducts';
import Banner from '../../Shared/Banner';

const data = require('../../assets/data/products.json');

var { height } = Dimensions.get('window');

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  // Search Function
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [isFocused, setIsFocused] = useState();

  useEffect(() => {
    setProducts(data);
    // Search Function
    setProductsFiltered(data);
    setIsFocused(false);

    return () => {
      setProducts([]);
      // Search Function
      setProductsFiltered([]);
      setIsFocused();
    };
  }, []);

  // Product Methods
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <NativeBaseProvider>
      <VStack w="100%" space={5} alignSelf="center">
        <Input
          placeholder="Search"
          variant="filled"
          width="100%"
          borderRadius="10"
          py="1"
          px="2"
          InputLeftElement={
            <Icon
              ml="2"
              size="4"
              color="gray.400"
              // as={<Ionicons name="ios-search" />}
            />
          }
        />
      </VStack>
      {/* <Stack space={4} w="100%" maxW="300px" mx="auto" mb="2" mt="2">
        <Input
          style={{ width: 300 }}
          variant="rounded"
          placeholder="Search"
          value={productsFiltered}
          isFocused={openList}
          onChangeText={(text) => searchProduct(text)}
        />
        {isFocused == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
      </Stack> */}

      {isFocused == true ? (
        <SearchProduct productsFiltered={productsFiltered} />
      ) : (
        <View style={styles.container}>
          <View>
            <Banner />
          </View>
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
      )}
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
  textInputStyle: {
    width: 300,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: 'white',
  },
});

export default ProductContainer;

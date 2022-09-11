import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';
import {
  Container,
  Header,
  Icon,
  Item,
  Input,
  NativeBaseProvider,
  extendTheme,
  Box,
  HStack,
  Button,
  Center,
  VStack,
  IconButton,
  Stack,
  Pressable,
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';
import Banner from '../../Shared/Banner';

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
const data = require('../../assets/data/products.json');
const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
    };
  }, []);

  // Product Methods
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <View>
          <Stack space={4} w="100%" alignItems="center">
            <Input
              variant="rounded"
              w={{
                base: '90%',
                md: '25%',
              }}
              InputRightElement={
                <Pressable onPress={onBlur}>
                  {focus == true ? (
                    <Icon
                      as={<AntDesign name="close" size={24} color="black" />}
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  ) : null}
                </Pressable>
              }
              placeholder="Search"
              onFocus={openList}
              onChangeText={(text) => searchProduct(text)}
            />
          </Stack>

          {focus == true ? (
            <SearchedProduct productsFiltered={productsFiltered} />
          ) : (
            <View>
              <View>
                <Banner />
              </View>
              <View style={styles.listContainer}>
                <FlatList
                  data={products}
                  numColumns={2}
                  renderItem={({ item }) => (
                    <ProductList key={item.brand} item={item} />
                  )}
                  keyExtractor={(item) => item.brand}
                />
              </View>
            </View>
          )}
        </View>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ProductContainer;

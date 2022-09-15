import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  ScrollView,
  Dimensions,
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
import { useFocusEffect } from '@react-navigation/native';
import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';

var { height } = Dimensions.get('window');

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
const productsCategories = require('../../assets/data/categories.json');
const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setFocus(false);
    setActive(-1);

    setProducts(data);
    setProductsFiltered(data);
    setCategories(productsCategories);
    setProductsCtg(data);
    setInitialState(data);
    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState();
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

  // Categories
  const changeCtg = (ctg) => {
    console.log(ctg);
    {
      ctg === 'all'
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
    console.log('productsCtg : ', productsCtg);
  };

  return (
    <NativeBaseProvider theme={theme}>
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
          <SearchedProduct
            navigation={props.navigation}
            productsFiltered={productsFiltered}
          />
        ) : (
          <ScrollView>
            <View>
              <View>
                <Banner />
              </View>
              <View>
                <CategoryFilter
                  categories={categories}
                  categoryFilter={changeCtg}
                  productsCtg={productsCtg}
                  active={active}
                  setActive={setActive}
                />
              </View>
              {productsCtg.length > 0 ? (
                <View style={styles.listContainer}>
                  {productsCtg.map((item) => {
                    return (
                      <ProductList
                        navigation={props.navigation}
                        key={item.name}
                        item={item}
                      />
                    );
                  })}
                </View>
              ) : (
                <View style={[styles.center, { height: height / 2 }]}>
                  <Text>No products found</Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </View>
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

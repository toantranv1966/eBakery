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
import CategoryFilter from './CategoryFilter';

var { height } = Dimensions.get('window');

const data = require('../../assets/data/products.json');
const productCategories = require('../../assets/data/categories.json');

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  // Search Function
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [isFocused, setIsFocused] = useState();
  // Categories Function
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  // Set badge will be active.
  const [active, setActive] = useState();
  // InitialState
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    setProducts(data);
    // Search Function
    setProductsFiltered(data);
    setIsFocused(false);
    setCategories(productCategories);
    setProductsCtg(data);
    setActive(-1);
    setInitialState(data);

    return () => {
      setProducts([]);
      // Search Function
      setProductsFiltered([]);
      setIsFocused();
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
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  // Categories Function ?
  const changeCtg = (ctg) => {
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

      {isFocused == true ? (
        <SearchProduct productsFiltered={productsFiltered} />
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

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
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

import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';

var { height, width } = Dimensions.get('window');

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
const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // Products
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setProductsCtg(res.data);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Api call error');
        });

      // Categorie
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log('Api call error');
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

  // Product Methods
  const searchProduct = (text) => {
    if (text == '') {
      setProductsFiltered(products);
    }
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };
  const OnBlur = () => {
    setFocus(false);
  };

  // Categories
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
    <>
      {loading == false ? (
        <NativeBaseProvider theme={theme}>
          <View>
            <Stack space={4} w="100%" alignItems="center">
              <TextInput
                style={styles.textInputStyle}
                placeholder="Search Here"
                onFocus={openList}
                onChangeText={(text) => searchProduct(text)}
                underlineColorAndroid="transparent"
                onBlur={OnBlur}
              />
            </Stack>

            {focus == true ? (
              <SearchedProduct
                navigation={props.navigation}
                productsFiltered={productsFiltered}
              />
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                pagingEnabled={true}
              >
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
      ) : (
        //Loading
        <NativeBaseProvider>
          <Container style={[styles.center, { backgroundColor: '#f2f2f2' }]}>
            <ActivityIndicator size="large" color="red" />
          </Container>
        </NativeBaseProvider>
      )}
    </>
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
    width: width - 10,
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderRadius: 20,
    borderColor: '#ffce00',
    backgroundColor: '#FFFFFF',
  },
});
export default ProductContainer;

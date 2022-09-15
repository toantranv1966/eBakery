import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
// import { Content, Left, Body, ListItem, Thumbnail, Text } from 'native-base';
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
  Button,
  Pressable,
  Badge,
  Flex,
} from 'native-base';

import ProductList from './ProductList';

var { width } = Dimensions.get('window');

const SearchedProduct = (props) => {
  const { productsFiltered } = props;
  console.log(productsFiltered);
  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Number product : {productsFiltered.length}
      </Heading>
      {productsFiltered.length > 0 ? (
        <FlatList
          data={productsFiltered}
          renderItem={({ item }) => (
            <Box alignItems="center">
              <Pressable
                onPress={() => {
                  props.navigation.navigate('Product Detail', { item: item });
                }}
                key={item._id}
                rounded="8"
                overflow="hidden"
                borderWidth="1"
                borderColor="coolGray.300"
                maxW="96"
                shadow="3"
                bg="coolGray.100"
                p="5"
              >
                <Box>
                  <Flex>
                    <HStack space={[2, 3]} justifyContent="space-between">
                      <Avatar
                        size="48px"
                        source={{
                          uri: item.image
                            ? item.image
                            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                        }}
                      />
                      <VStack>
                        <Text
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          color="coolGray.800"
                          bold
                        >
                          {item.name}
                        </Text>
                        <Text
                          color="coolGray.600"
                          _dark={{
                            color: 'warmGray.200',
                          }}
                        >
                          {item.description}
                        </Text>
                        <Button rounded success>
                          <Text>Add to Cart</Text>
                        </Button>
                      </VStack>
                      <Spacer />
                    </HStack>
                  </Flex>
                </Box>
              </Pressable>
            </Box>
            // <Box
            //   borderBottomWidth="1"
            //   _dark={{
            //     borderColor: 'muted.50',
            //   }}
            //   borderColor="muted.800"
            //   pl={['0', '4']}
            //   pr={['0', '5']}
            //   py="2"
            // >
            //   <HStack space={[2, 3]} justifyContent="space-between">
            //     <Avatar
            //       size="48px"
            //       source={{
            //         uri: item.image
            //           ? item.image
            //           : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
            //       }}
            //     />
            //     <VStack>
            //       <Text
            //         _dark={{
            //           color: 'warmGray.50',
            //         }}
            //         color="coolGray.800"
            //         bold
            //       >
            //         {item.name}
            //       </Text>
            //       <Text
            //         color="coolGray.600"
            //         _dark={{
            //           color: 'warmGray.200',
            //         }}
            //       >
            //         {item.description}
            //       </Text>
            //       <Button rounded success>
            //         <Text>Add to Cart</Text>
            //       </Button>
            //     </VStack>
            //     <Spacer />
            //   </HStack>
            // </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: 'center' }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </Box>

    // <ScrollView>
    //   <View style={{ width: width }}>
    //     {productsFiltered.length > 0 ? (
    //       <View style={styles.listContainer}>
    //         {productsFiltered.map((item) => {
    //           return <ProductList key={item.name} item={item} />;
    //         })}
    //       </View>
    //     ) : (
    //       <View style={[styles.center]}>
    //         <Text>No products found</Text>
    //       </View>
    //     )}
    //   </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchedProduct;

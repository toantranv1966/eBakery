import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
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

var { width } = Dimensions.get('window');

const SearchedProduct = (props) => {
  const { productsFiltered } = props;
  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Tìm thấy {productsFiltered.length} sản phẩm
      </Heading>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              props.navigation.navigate('Product Detail', { item: item });
            }}
            key={item._id}
          >
            <Image
              source={{
                uri: item.image
                  ? item.image
                  : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
              }}
              resizeMode="contain"
              style={styles.image}
            />
            <Text>{item.name}</Text>
            <Text>$ {item.price}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: 'center' }}>
            Không có sản phẩm nào phù hợp với tiêu chí đã chọn
          </Text>
        </View>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 2,
  },
});

export default SearchedProduct;

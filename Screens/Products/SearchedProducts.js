import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Content, Left, Body, ListItem, Thumbnail, Text } from 'native-base';

const SearchProduct = (props) => {
  const { productsFiltered } = props;
  return (
    <Content>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => {
          <ListItem
            // onPress={navigation}
            key={item.id}
            avatar
          >
            <Left>
              <Thumbnail
                source={{
                  uri: item.image
                    ? item.image
                    : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                }}
              />
            </Left>
            <Body>
              <Text>{item.name}</Text>
              <Text note>{item.description}</Text>
            </Body>
          </ListItem>;
        })
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: 'center' }}>
            No product match the selected criteria
          </Text>
        </View>
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchProduct;

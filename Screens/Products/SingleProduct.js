import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
} from 'react-native';
import {
  Left,
  Right,
  Container,
  H1,
  NativeBaseProvider,
  extendTheme,
} from 'native-base';

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

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);

  return (
    <NativeBaseProvider theme={theme}>
      <View style={styles.container}>
        <ScrollView style={{ marginBottom: 80, padding: 5 }}>
          <View>
            <Text>Product Detail</Text>
          </View>
          <View>
            <Image
              source={{
                uri: item.image
                  ? item.image
                  : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
              }}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentHeader}>{item.name}</Text>
            <Text style={styles.contentText}>{item.brand}</Text>
          </View>
          {/* TODO: Description, Rich Description and Availability */}
        </ScrollView>
        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.price}>$ {item.price}</Text>
          </View>
          <View>
            <Button title="Add" />
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  price: {
    fontSize: 24,
    color: 'red',
  },
});

export default SingleProduct;

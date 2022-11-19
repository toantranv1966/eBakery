import React from 'react';
import { StyleSheet } from 'react-native';
import { Badge, Text, NativeBaseProvider, extendTheme } from 'native-base';

// Edit Redux
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

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

const CartIcon = (props) => {
  const cartItems = useSelector((state) => state.shoppingReducer.addedProducts);
  return (
    <>
      {cartItems.length ? (
        <NativeBaseProvider theme={theme}>
          <Badge style={styles.badge}>
            <Text style={styles.text}>{props.cartItems.length}</Text>
          </Badge>
        </NativeBaseProvider>
      ) : null}
    </>
  );
};

// const mapStateToProps = (state) => {
//   const { cartItems } = state;
//   return {
//     cartItems: cartItems,
//   };
// };

const styles = StyleSheet.create({
  badge: {
    width: 25,
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    top: -4,
    right: -15,
  },
  text: {
    fontSize: 12,
    width: 100,
    fontWeight: 'bold',
  },
});

// export default connect(mapStateToProps)(CartIcon);
export default CartIcon;

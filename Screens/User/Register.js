import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const register = () => {
    if (email === '' || name === '' || phone === '' || password === '') {
      setError('Vui lòng điền vào biểu mẫu');
    }

    let user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false,
    };
    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Bạn đã đăng ký thành công',
            text2: 'Vui lòng đăng nhập vào tài khoản của bạn',
          });
          setTimeout(() => {
            props.navigation.navigate('Login');
          }, 500);
        }
      })
      .catch((error) => {
        console.log('Error register', error);
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Đã xảy ra sự cố',
          text2: 'Vui lòng thử lại',
        });
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={'Đăng ký'}>
        <Input
          placeholder={'Email'}
          name={'email'}
          id={'email'}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={'Tên'}
          name={'name'}
          id={'name'}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={'Số điện thoại'}
          name={'phone'}
          id={'phone'}
          keyboardType={'numeric'}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={'Mật khẩu'}
          name={'password'}
          id={'password'}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <EasyButton large primary onPress={() => register()}>
            <Text style={{ color: 'white' }}>Đăng ký</Text>
          </EasyButton>
        </View>
        <View>
          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate('Login')}
          >
            <Text style={{ color: 'white' }}>Đăng nhập</Text>
          </EasyButton>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    margin: 10,
    alignItems: 'center',
  },
});

export default Register;

import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

// Context
import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../Context/actions/Auth.actions';

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const isLogin = context.stateUser.isAuthenticated;
    if (isLogin === true) {
      // console.log('You was login');
      // console.log('User Profile', context.stateUser.user);
      props.navigation.navigate('UserProfile');
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === '' || password === '') {
      setError('Vui lòng điền thông tin đăng nhập của bạn');
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <FormContainer title={'Đăng nhập'}>
      <Input
        placeholder={'Email'}
        name={'email'}
        id={'email'}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={'Mật khẩu'}
        name={'password'}
        id={'password'}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <EasyButton large primary onPress={() => handleSubmit()}>
          <Text style={{ color: 'white' }}>Đăng nhập</Text>
        </EasyButton>
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Bạn chưa có tài khoản?</Text>
        <EasyButton
          large
          secondary
          onPress={() => props.navigation.navigate('Register')}
        >
          <Text style={{ color: 'white' }}>Đăng ký</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default Login;

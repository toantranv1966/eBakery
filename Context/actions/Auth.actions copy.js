import jwt_decode from 'jwt-decode';
// import AsyncStorage from '@react-native-community/async-storage';
// import {AsyncStorage} from 'react-native';
import { AsyncStorage } from 'react-native';
import Toast from 'react-native-toast-message';
import baseURL from '../../assets/common/baseUrl';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const loginUser = (user, dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append('token', '{{token}}');
  myHeaders.append('tokenByClass', '{{tokenByClass}}');
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    email: 'admin@mail.com',
    password: '12345678',
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('http://192.168.1.7:3000/api/v1/users/login', requestOptions)
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        const token = data.token;
        AsyncStorage.setItem('jwt', token);
        const jwt = AsyncStorage.getItem('jwt');
        const decoded = jwt_decode(token);
        console.log('DECODED', decoded);
        dispatch(setCurrentUser(decoded, user));
      } else {
        logoutUser(dispatch);
      }
    })
    .catch((error) => console.log('error', error));
};

export const getUserProfile = (id) => {
  fetch(`${baseURL}users/${id}`, {
    method: 'GET',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export const logoutUser = (dispatch) => {
  AsyncStorage.removeItem('jwt');
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};

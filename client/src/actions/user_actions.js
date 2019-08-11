import axios from 'axios';

import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER
} from './types';
import { USER_SERVER, PRODUCT_SERVER } from '../components/utils/misc';

export function registerUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/register`, dataToSubmit).then(res => res.data);
  return {
    type: REGISTER_USER,
    payload: request
  }
}

export function loginUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/login`, dataToSubmit).then(res => res.data);
  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function auth() {
  const request = axios.get(`${USER_SERVER}/auth`).then(res => res.data);
  return {
    type: AUTH_USER,
    payload: request
  }
}

export function logOutUser() {
  const request = axios.get(`${USER_SERVER}/logout`).then(res => res.data);
  return {
    type: LOGOUT_USER,
    payload: request
  }
}

export function addToCart(_id) {
  const request = axios.post(`${USER_SERVER}/addToCart?productId=${_id}`).then(res => res.data);
  return {
    type: ADD_TO_CART_USER,
    payload: request
  }
}

export function getCartItems(cartItems, userCart) {
  const request = axios.get(`${PRODUCT_SERVER}/sneakers?id=${cartItems}&type=array`).then(res => {
    // Add Quantity from User Data to Cart Detail
    userCart.forEach((item) => {
      res.data.forEach((elem, i) => {
        if (item.id === elem._id) {
          res.data[i].quantity = item.quantity;
        }
      });
    });
    return res.data;
  });
  return {
    type: GET_CART_ITEMS_USER,
    payload: request
  }
}
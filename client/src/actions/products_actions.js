import axios from 'axios';

import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_BRANDS,
  GET_PRODUCTS_BY_CATEGORIES,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  ADD_BRAND,
  ADD_CATEGORY,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from './types';

import { PRODUCT_SERVER } from '../components/utils/misc';

export function getProductsBySell() {
  const request = axios.get(`${PRODUCT_SERVER}/sneakers/collections?sortBy=sold&order=desc&limit=4`).then(res => res.data);
  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: request
  }
}

export function getProductsByArrival() {
  const request = axios.get(`${PRODUCT_SERVER}/sneakers/collections?sortBy=createdAt&order=desc&limit=4`).then(res => res.data);
  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  }
}

export function getBrands() {
  const request = axios.get(`${PRODUCT_SERVER}/brands`).then(res => res.data);
  return {
    type: GET_PRODUCTS_BY_BRANDS,
    payload: request
  }
}

export function getCategories() {
  const request = axios.get(`${PRODUCT_SERVER}/categories`).then(res => res.data);
  return {
    type: GET_PRODUCTS_BY_CATEGORIES,
    payload: request
  }
}

export function getProductsToShop(skip, limit, filters = [], previousState = []) {
  const data = {
    skip,
    limit,
    filters
  }
  const request = axios.post(`${PRODUCT_SERVER}/shop`, data).then(res => {
    let newState = [
      ...previousState,
      ...res.data.sneakers
    ]
    return {
      size: res.data.size,
      sneakers: newState
    }
  });
  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: request
  }
}

export function addProduct(dataToSubmit) {
  const request = axios.post(`${PRODUCT_SERVER}/sneakers`, dataToSubmit).then(res => res.data);
  return {
    type: ADD_PRODUCT,
    payload: request
  }
}

export function clearProduct() {
  return {
    type: CLEAR_PRODUCT,
    payload: ''
  }
}

export function addBrand(dataToSubmit, existingBrands) {
  const request = axios.post(`${PRODUCT_SERVER}/brands`, dataToSubmit).then(res => {
    let brands = [...existingBrands, res.data.brand];
    return {
      success: res.data.success,
      brands
    }
  });
  return {
    type: ADD_BRAND,
    payload: request
  }
}

export function addCategory(dataToSubmit, existingCategories) {
  const request = axios.post(`${PRODUCT_SERVER}/categories`, dataToSubmit).then(res => {
    let categories = [...existingCategories, res.data.category];
    return {
      success: res.data.success,
      categories
    }
  });
  return {
    type: ADD_CATEGORY,
    payload: request
  }
}

export function getProductDetail(id) {
  const request = axios.get(`${PRODUCT_SERVER}/sneakers?id=${id}&type=single`).then(res => {
    return res.data[0]
  });
  return {
    type: GET_PRODUCT_DETAIL,
    payload: request
  }
}

export function clearProductDetail() {
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: ''
  }
}
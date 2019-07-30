import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_BRANDS,
  GET_PRODUCTS_BY_CATEGORIES
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload }
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload }
    case GET_PRODUCTS_BY_BRANDS:
      return { ...state, byBrands: action.payload }
    case GET_PRODUCTS_BY_CATEGORIES:
      return { ...state, byCategories: action.payload }
    default:
      return state;
  }
}
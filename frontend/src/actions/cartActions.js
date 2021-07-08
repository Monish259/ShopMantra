import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)); //saving cartItems to localStorage
  //, getState() -> used to get any statte from reducers defined in store.js file, JSON.stringify is used coz we can store only strings in our localStorage
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)); //saving cartItems to localStorage
  //, getState() -> used to get any statte from reducers defined in store.js file, JSON.stringify is used coz we can store only strings in our localStorage
  // line 31 will run after reducer fn is called and executed so updated arrayu is returned in localStorage
};

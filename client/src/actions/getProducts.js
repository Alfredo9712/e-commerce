import { GET_PRODUCTS } from './types';
import axios from 'axios';
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/all-products');
    const data = [...res.data];

    dispatch({
      type: 'GET_PRODUCTS',
      payload: data,
    });
  } catch (err) {}
};

export const getShirts = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/shirts');
    const data = [...res.data];

    dispatch({
      type: 'GET_SHIRTS',
      payload: data,
    });
  } catch (err) {}
};

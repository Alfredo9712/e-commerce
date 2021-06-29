import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from '../actions/types';
const initialState = {
  data: [],
};
export function productReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

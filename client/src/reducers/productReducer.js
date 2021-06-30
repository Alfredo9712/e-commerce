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
    case 'GET_PRODUCTS':
      return {
        ...state,
        data: action.payload,
      };
    case 'GET_SHIRTS':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}

import { combineReducers } from 'redux';
import { productReducer } from './productReducer';
import { cartReducer } from './cartReducer';
export const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
});

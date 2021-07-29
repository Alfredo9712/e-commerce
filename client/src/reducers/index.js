import { combineReducers } from 'redux';
import { productReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { errorReducer } from './errorReducer';
import { adminReducer } from './adminReducer';
export const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  admin: adminReducer,
  error: errorReducer,
});

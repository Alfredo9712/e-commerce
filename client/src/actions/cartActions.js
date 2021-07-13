export const addToCart = (product) => (dispatch) => {
  dispatch({
    type: 'ADD_TO_CART',
    payload: product,
  });
};

export const deleteCartItem = (product) => (dispatch) => {
  dispatch({
    type: 'DELETE_CART_ITEM',
    payload: product,
  });
};

export const deleteCart = () => (dispatch) => {
  dispatch({
    type: 'DELETE_CART',
  });
};

export const addToCart = (product) => async (dispatch) => {
  dispatch({
    type: 'ADD_TO_CART',
    payload: product,
  });
};

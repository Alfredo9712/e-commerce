//prettier-ignore
const data = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = {
  data,
};
export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const find = state.data.find(
        (item) =>
          item.product === action.payload.product &&
          item.selectedSize === action.payload.selectedSize
      );
      //move code here

      const addCart =
        find !== undefined
          ? state.data.map((item) =>
              item.product === action.payload.product &&
              item.selectedSize === action.payload.selectedSize
                ? {
                    ...item,
                    selectedQuantity: action.payload.selectedQuantity,
                    quantityPrice:
                      action.payload.selectedQuantity * action.payload.price,
                  }
                : item
            )
          : [
              ...state.data,
              //prettier-ignore
              {
                ...action.payload,quantityPrice: action.payload.selectedQuantity * action.payload.price
              },
            ];
      //set local storage here
      // console.log(addCart);
      localStorage.setItem('cart', JSON.stringify(addCart));
      return {
        data: addCart,
      };
    case 'DELETE_CART':
      localStorage.removeItem('cart');
      return {
        data: [],
      };
    case 'DELETE_CART_ITEM':
      const filteredCart = state.data.filter(
        (item) => item.cartId !== action.payload.cartId
      );
      localStorage.setItem('cart', JSON.stringify(filteredCart));

      return {
        ...state,
        data: filteredCart,
      };
    default:
      return state;
  }
}

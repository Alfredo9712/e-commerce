const initialState = {
  data: [],
};
export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const find = state.data.find(
        (item) =>
          item.product === action.payload.product &&
          item.selectedSize === action.payload.selectedSize
      );
      return {
        data:
          find !== undefined
            ? state.data.map((item) =>
                item.product === action.payload.product &&
                item.selectedSize === action.payload.selectedSize
                  ? {
                      ...item,
                      selectedQuantity: action.payload.selectedQuantity,
                    }
                  : item
              )
            : [...state.data, action.payload],
      };
    case 'DELETE_CART':
      return {
        data: [],
      };
    case 'DELETE_CART_ITEM':
      return {
        ...state,
        data: state.data.filter(
          (item) => item.cartId !== action.payload.cartId
        ),
      };
    default:
      return state;
  }
}

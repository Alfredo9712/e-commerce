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
    case 'FILTER_PRODUCTS':
      return {
        ...state,
        data: action.payload,
      };
    case 'DELETE_PRODUCT':
      const removedProduct = state.data.filter(
        (product) => product._id !== action.payload
      );
      return {
        ...state,
        data: removedProduct,
      };
    case 'EDIT_PRODUCT':
      const { _id, category, product, image, sizes } = action.payload;
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === _id ? { ...item, category, product, image, sizes } : item
        ),
      };
    case 'PAGINATE_PRODUCT':
      return {
        ...state,
        data: action.payload,
        length: action.length,
      };

    default:
      return state;
  }
}

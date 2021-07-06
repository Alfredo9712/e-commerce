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
    default:
      return state;
  }
}

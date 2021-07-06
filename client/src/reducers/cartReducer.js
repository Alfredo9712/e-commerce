const initialState = {
  data: [],
};
export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    default:
      return state;
  }
}

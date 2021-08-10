const initialState = {
  data: [],
};
export function orderReducer(state = initialState, action) {
  switch (action.type) {
    case "ORDER_AMOUNT_MONTHLY":
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
}

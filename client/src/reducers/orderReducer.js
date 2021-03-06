const initialState = {
  data: [],
  title: 2021,
  request: [],
  pieData: [],
  pendingOrders: [],
  totalOrders: 0,
  completeOrders: [],
};
export function orderReducer(state = initialState, action) {
  switch (action.type) {
    case 'ORDER_AMOUNT_MONTHLY':
      return {
        ...state,
        data: action.payload,
        title: action.title,
        request: action.request,
        pieData: action.pieData,
        earnings: action.earnings,
        shirtEarnings: action.shirtPrice,
        pantEarnings: action.pantPrice,
        totalOrders: action.totalOrders,
        pendingOrders: action.pendingOrders,
        completeOrders: action.completeOrders,
      };
    case 'ORDER_AMOUNT_DAILY':
      return {
        ...state,
        data: action.payload,
        title: action.title,
        request: action.request,
        pieData: action.pieData,
        earnings: action.earnings,
        shirtEarnings: action.shirtPrice,
        pantEarnings: action.pantPrice,
        totalOrders: action.totalOrders,
        pendingOrders: action.pendingOrders,
        completeOrders: action.completeOrders,
      };

    default:
      return state;
  }
}

const initialState = {
  data: { authenticated: false },
};
export function adminReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        data: { authenticated: action.payload.authenticated },
      };
    // case 'LOGIN_ERROR':
    //   return {
    //     ...state,
    //     data: {
    //       authenticated: action.payload.authenticated,
    //       error: action.payload.error,
    //     },
    //   };

    default:
      return state;
  }
}

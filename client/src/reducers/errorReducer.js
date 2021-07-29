const initialState = {
  data: { error: false },
};
export function errorReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        data: {
          error: action.payload.error,
        },
      };

    default:
      return state;
  }
}

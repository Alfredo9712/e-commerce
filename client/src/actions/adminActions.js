import axios from 'axios';
export const adminLogin = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('/api/admin/login', {
      email,
      password,
    });

    if (response.data.token) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          authenticated: true,
        },
      });
      localStorage.setItem('token', response.data.token);
    } else {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: {
          error: response.data.msg,
        },
      });
    }
  } catch (error) {}
};

export const adminLogout = () => (dispatch) => {
  dispatch({
    type: 'ADMIN_LOGOUT',
  });
};

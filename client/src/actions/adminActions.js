import axios from "axios";
export const adminLogin = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3000/api/admin/login", {
      email,
      password,
    });
    console.log(response);

    if (response.data.token) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          authenticated: true,
        },
      });
      localStorage.setItem("token", response.data.token);
    } else {
      dispatch({
        type: "LOGIN_ERROR",
        payload: {
          error: response.data.msg,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

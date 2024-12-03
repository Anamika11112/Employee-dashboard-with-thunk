import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Helpers/Constants";
import toast from "react-hot-toast";
export const userLogin =
  (data, navigateTo, setLoginLoader) => async (dispatch) => {
    try {
      setLoginLoader(true);
      const response = await axios.post(`${baseUrl}/users/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        dispatch(loginSuccsess({ token: response.data.data.token }));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token", response.data.data.token);
        toast.success(response.data.data.message);
        navigateTo();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoginLoader(false);
    }
  };
const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginData: {},
  },
  reducers: {
    loginSuccsess(state, action) {
      state.loginData = action.payload;
    },
  },
});
export const { loginSuccsess } = loginSlice.actions;
export default loginSlice.reducer;

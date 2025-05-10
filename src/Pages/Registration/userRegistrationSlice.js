import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../Helpers/Constants";

export const userSignUp =
  (data, navigateTo, setSighnUpLoader) => async (dispatch) => {
    const { email, password } = data;
    try {
      setSighnUpLoader(true);
      const response = await axios.post(
        `${baseUrl}/users/signup`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        dispatch(sighnUpSuccess({ token: response.data.data.token }));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token", response.data.data.token);
        toast.success(response.data.data.message);
        navigateTo();
      }
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
      else toast.error(error.message);
    } finally {
      setSighnUpLoader(false);
    }
  };
const userSignupSlice = createSlice({
  name: "auth",
  initialState: {
    data: {},
  },
  reducers: {
    sighnUpSuccess(state, action) {
      state.data = action.payload;
    },
  },
});
export const { sighnUpSuccess } = userSignupSlice.actions;
export default userSignupSlice.reducer;

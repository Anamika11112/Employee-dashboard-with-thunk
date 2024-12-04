import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../Helpers/Constants";

export const fetchEmployees = (setEmployeeTableLoader) => async (dispatch) => {
  try {
    setEmployeeTableLoader(true);
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/employee/list`, {
      headers: {
        Authorization: token,
      },
    });
    if (response.status === 200) {
      dispatch(employeeListFetchSuccess(response.data.data.list));
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setEmployeeTableLoader(false);
  }
};

export const deleteEmployee =
  (id, setDeleteLoader, setDeleteModal, setEmployeeTableLoader) =>
  async (dispatch) => {
    try {
      setDeleteLoader(true);
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${baseUrl}/employee/delete/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: {
          employeeId: id,
        },
      });
      if (response.status === 201) {
        toast.success(response.data.message);
        setDeleteModal(false);
        dispatch(fetchEmployees(setEmployeeTableLoader));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setDeleteLoader(false);
    }
  };

const dashBoardSlice = createSlice({
  name: "employees",
  initialState: {
    employeeList: [],
  },
  reducers: {
    employeeListFetchSuccess(state, action) {
      state.employeeList = action.payload;
    },
  },
});
export const { employeeListFetchSuccess } = dashBoardSlice.actions;
export default dashBoardSlice.reducer;
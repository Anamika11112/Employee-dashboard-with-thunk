import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../Helpers/Constants/index";
import { fetchEmployees } from "../Dashboard/dashboardSlice";

export const registerEmployee =
  (data, setEmployeeTableLoader, setAddEditModal) => async (dispatch) => {
    try {
      dispatch(addOrEditLoading(true));
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseUrl}/employee/register`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.status === 201) {
        dispatch(fetchEmployees(setEmployeeTableLoader));
        setAddEditModal(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      dispatch(addOrEditLoading(false));
    }
};

export const updateEmployeeEdits =
  (data, setAddEditModal, setEmployeeTableLoader) => async (dispatch) => {
    try {
      dispatch(addOrEditLoading(true));
      const token = localStorage.getItem("token");
      const response = await axios.put(`${baseUrl}/employee/edit`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.status === 201) {
        dispatch(fetchEmployees(setEmployeeTableLoader));
        setAddEditModal(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(addOrEditLoading(false));
    }
};

export const fetchSingleEmployee = (id, setEditLoader) => async (dispatch) => {
  try {
    setEditLoader(true);
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/employee/getEmployeeById`, {
      headers: {
        Authorization: token,
      },
      params: {
        employeeId: id,
      },
    });
    if (response.status === 200) {
      dispatch(singleEmployeeFetchSuccess(response.data.data.employee));
    }
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    setEditLoader(false);
  }
};

const addEditSlice = createSlice({
  name: "addEdit",
  initialState: {
    employee: {},
    addOrEditLoading: false,
  },
  reducers: {
    addOrEditLoading(state, action) {
      state.addOrEditLoading = action.payload;
    },
    singleEmployeeFetchSuccess(state, action) {
      state.employee = action.payload;
    },
    removeSingleEmployee(state) {
      state.employee = {};
    },
  },
});
export const {
  addOrEditLoading,
  singleEmployeeFetchSuccess,
  removeSingleEmployee,
} = addEditSlice.actions;
export default addEditSlice.reducer;
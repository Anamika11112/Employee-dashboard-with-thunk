import { combineReducers } from "redux";
import userSignupReducer from "./Pages/Registration/userRegistrationSlice";
import loginReducer from "./Pages/Login/loginSlice";
import addEditReducer from "./Pages/AddEditModal/addEditSlice";
import dashboardReducer from "./Pages/Dashboard/dashboardSlice";

const rootReducer = combineReducers({
  authSignup: userSignupReducer,
  loginAuth: loginReducer,
  addOrEdit: addEditReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;

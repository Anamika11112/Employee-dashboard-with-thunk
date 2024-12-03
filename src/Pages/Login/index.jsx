import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dynamicInputHandler } from "../../Helpers/Utilities";
import { useDispatch } from "react-redux";
import { userLogin } from "./loginSlice";
import { loginValidation } from "./loginValidation";
import TextInput from "../../Components/TextInput";
import Button from "../../Components/Button";
import "./index.css";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setloginErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const { emailError, passwordError } = loginErrors;
  const [loginLoader, setLoginLoader] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, []);
  const handleLogin = (event) => {
    event.preventDefault();
    const isValid = loginValidation(setloginErrors, loginCredentials);
    if (isValid)
      dispatch(
        userLogin(loginCredentials, () => navigate("/"), setLoginLoader)
      );
  };
  return (
    <form className="userLoginForm" onSubmit={handleLogin}>
      <h1>LOGIN</h1>
      <TextInput
        label="Email"
        name="email"
        disabled={loginLoader}
        errorMessage={emailError}
        onChange={(event) => dynamicInputHandler(event, setLoginCredentials)}
      />
      <div className="password_group">
        <TextInput
          type="password"
          label="Password"
          name="password"
          disabled={loginLoader}
          errorMessage={passwordError}
          onChange={(event) => dynamicInputHandler(event, setLoginCredentials)}
        />
      </div>
      <Button
       type="submit"
        className="primary_blue_button"
        loading={loginLoader}
        loaderClassName="small_loader"
      >
        Login
      </Button>
    </form>
  );
}
export default Login;

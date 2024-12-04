import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dynamicInputHandler } from "../../Helpers/Utilities";
import { userRegistrationValidtation } from "./userRegValidation";
import { userSignUp } from "./userRegistrationSlice";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import "./index.css";

function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signUpError, setSignUpError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, password, confirmPassword } = signUpError;
  const [sighnUpLoader, setSighnUpLoader] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, []);
  const handleUserRegistration = (event) => {
    event.preventDefault();
    const isValid = userRegistrationValidtation(signUpData, setSignUpError);
    if (isValid) {
      dispatch(userSignUp(signUpData, () => navigate("/"), setSighnUpLoader));
    }
  };
  return (
    <form className="UserRegistrationForm" onSubmit={handleUserRegistration}>
      <h1>REGISTER</h1>
      <TextInput
        label="Your Email"
        name="email"
        statusIcon="true"
        disabled={sighnUpLoader}
        errorMessage={email}
        onChange={(event) => dynamicInputHandler(event, setSignUpData)}
      />
      <div className="password_group">
        <TextInput
          type="password"
          label="Password"
          name="password"
          disabled={sighnUpLoader}
          errorMessage={password}
          statusIcon="true"
          onChange={(event) => dynamicInputHandler(event, setSignUpData)}
        />
        <TextInput
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          disabled={sighnUpLoader}
          errorMessage={confirmPassword}
          statusIcon="true"
          onChange={(event) => dynamicInputHandler(event, setSignUpData)}
        />
      </div>
      <Button
        type="submit"
        className="primary_blue_button"
        loading={sighnUpLoader}
        loaderClassName="small_loader"
      >
        Register
      </Button>
    </form>
  );
}
export default Registration;
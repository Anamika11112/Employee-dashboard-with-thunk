import { emailRegex } from "../../Helpers/Constants";
import { setError } from "../../Helpers/Utilities";

export const loginValidation = (setloginErrors, loginCredentials) => {
  const { email, password } = loginCredentials;
  let isValid = true;
  if (!email) {
    setError("email", setloginErrors, "Email is required!");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    setError("email", setloginErrors, "Enter valid Email");
    isValid = false;
  } else {
    setError("email", setloginErrors, "");
  }
  if (!password) {
    setError("password", setloginErrors, "Password is required!");
    isValid = false;
  } else {
    setError("password", setloginErrors, "");
  }
  return isValid;
};

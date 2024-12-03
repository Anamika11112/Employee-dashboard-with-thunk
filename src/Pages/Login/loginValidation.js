import { emailRegex } from "../../Helpers/Constants";
import { setError } from "../../Helpers/Utilities";

export const loginValidation = (setloginErrors, loginCredentials) => {
  const { email, password } = loginCredentials;
  let isValid = true;
  if (!email) {
    setError("emailError", setloginErrors, "Email is required!");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    setError("emailError", setloginErrors, "Enter valid Email");
    isValid = false;
  } else {
    setError("emailError", setloginErrors, "");
  }
  if (!password) {
    setError("passwordError", setloginErrors, "Password is required!");
    isValid = false;
  } else {
    setError("passwordError", setloginErrors, "");
  }
  return isValid;
};

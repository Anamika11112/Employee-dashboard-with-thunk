import { emailRegex, passwordRegex } from "../../Helpers/Constants";
import { setError } from "../../Helpers/Utilities";

export const userRegistrationValidtation = (signUpData, setSignUpError) => {
  const { email, password, confirmPassword } = signUpData;
  let isValid = true;
  if (!email) {
    setError("email", setSignUpError, "Email is required!");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    setError("email", setSignUpError, "Invalid Email");
    isValid = false;
  } else {
    setError("email", setSignUpError, "");
  }
  if (!password) {
    setError("password", setSignUpError, "Password is required!");
    isValid = false;
  } else if (!passwordRegex.test(password)) {
    setError(
      "password",
      setSignUpError,
      "Password should contain 1 digit,1 special character"
    );
    isValid = false;
  } else if (password.length < 6) {
    setError("password", setSignUpError, "Min 6 characters required.");
    isValid = false;
  } else {
    setError("password", setSignUpError, "");
  }
  if (!confirmPassword) {
    setError("confirmPassword", setSignUpError, "Confirm your password!");
    isValid = false;
  } else if (password !== confirmPassword) {
    setError("confirmPassword", setSignUpError, "Password does not match!");
    isValid = false;
  } else {
    setError("confirmPassword", setSignUpError, "");
  }
  return isValid;
};

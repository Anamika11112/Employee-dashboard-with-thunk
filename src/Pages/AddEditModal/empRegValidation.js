import {
  designationRegex,
  emailRegex,
  phoneRegex,
  textRegex,
} from "../../Helpers/Constants";
export const validateField = (name, value, setErrorState) => {
  let errorMessage = "";
  const today = new Date();
  switch (name) {
    case "fname":
      if (!value.trim()) errorMessage = "Please enter first name";
      else if (!textRegex.test(value)) errorMessage = "Invalid format";
      break;

    case "lname":
      if (!value.trim()) errorMessage = "Please enter last name";
      else if (!textRegex.test(value)) errorMessage = "Invalid format";
      break;

    case "email":
      if (!value.trim()) errorMessage = "Please enter email address";
      else if (!emailRegex.test(value))
        errorMessage = "Please enter a valid email";
      break;

    case "phoneNumber":
      if (!value.trim()) errorMessage = "Please enter phone number";
      else if (!phoneRegex.test(value))
        errorMessage = "Enter a valid phone number";
      break;

    case "dob":
      if (!value.trim()) errorMessage = "Please enter DOB";
      else {
        const dob = new Date(value);
        const age = today.getFullYear() - dob.getFullYear();
        const isBirthdayPassed =
          today.getMonth() > dob.getMonth() ||
          (today.getMonth() === dob.getMonth() &&
            today.getDate() >= dob.getDate());
        if (age < 18 || (age === 18 && !isBirthdayPassed)) {
          errorMessage = "User must be at least 18 years old";
        }
      }
      break;

    case "doj":
      if (!value) errorMessage = "Please enter join date";
      else {
        const doj = new Date(value);
        if (doj > today) {
          errorMessage = "Invalid Date";
        }
      }
      break;

    case "designation":
      if (!value.trim()) errorMessage = "Please enter designation";
      else if (!designationRegex.test(value)) errorMessage = "Invalid format";
      break;

    case "experience":
      if (!value.trim()) errorMessage = "Please enter experience in yr";
      else if (value < 0) errorMessage = "Enter a valid experience";
      break;

    default:
      errorMessage = "Invalid Field";
      break;
  }

  setErrorState((prevState) => ({
    ...prevState,
    [name]: errorMessage,
  }));
  return errorMessage;
};

export const validateForm = (employeeRegDetails, setEmployeeRegError) => {
  let isValid = true;
  Object.entries(employeeRegDetails).forEach(([key, value]) => {
    const errorMessage = validateField(key, value, setEmployeeRegError);
    if (errorMessage) isValid = false;
  });
  return isValid;
};

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import "./index.css";
function TextInput({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  disabled,
  statusIcon = false,
  errorMessage,
  ...rest
}) {
  const safeValue = value || "";
  return (
    <div className="input_container">
      <label htmlFor={name}>{label}</label>
      <div className="inputField_wrapper">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />
        {statusIcon && (
          errorMessage ? (
            <FontAwesomeIcon
              className="faCircleXmark"
              icon={faCircleXmark}
              style={{ color: "red" }}
            />
          ) : (
            safeValue.trim() && (
              <FontAwesomeIcon
                className="faCheckCircle"
                icon={faCheckCircle}
                style={{ color: "green" }}
              />
            )
          )
        )}
      </div>
      <div className="inputError">
        {errorMessage && <p className="input_error_message">{errorMessage}</p>}
      </div>
    </div>
  );
}
export default TextInput;
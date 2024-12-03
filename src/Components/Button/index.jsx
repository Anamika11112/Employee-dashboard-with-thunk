import React from "react";
import Loader from "../Loader";
import "./index.css";
function Button({
  type = "button",
  loading,
  disabled,
  children,
  onClick,
  className,
  loaderClassName,
}) {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? <Loader className={loaderClassName} /> : children}
    </button>
  );
}
export default Button;
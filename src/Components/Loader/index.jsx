import React from "react";
import "./index.css";
function Loader({ className }) {
  return (
    <div className="loader_container">
      <div className={`loader ${className}`}></div>
    </div>
  );
}
export default Loader;
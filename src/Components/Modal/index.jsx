import React from "react";
import "./index.css";
function Modal({
  children,
  onClick,
  modalClassName,
  overlayClassName,
}) {
  return (
    <div>
      <div className={`modal_container ${modalClassName}`}>{children}</div>
      <div className={`overlay ${overlayClassName}`} onClick={onClick}></div>
    </div>
  );
}
export default Modal;
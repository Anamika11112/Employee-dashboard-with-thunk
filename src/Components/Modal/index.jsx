import React from "react";
import "./index.css";
function Modal({
  children,
  onClick,
  className,
  modalClassName,
  overlayClassName,
}) {
  return (
    <div>
      <div className={className}>
        <div className={`modal_container ${modalClassName}`}>{children}</div>
      </div>
      <div className={`overlay ${overlayClassName}`} onClick={onClick}></div>
    </div>
  );
}
export default Modal;
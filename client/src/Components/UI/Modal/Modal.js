import React, { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const handleClose = () => {
    onClose();
  };

  return isOpen ? (
    <>
      <div className="modal-overlay" onClick={handleClose}></div>
      <div className="modal">
        <button className="modal-close" onClick={handleClose}>
          Close
        </button>
        {children}
      </div>
    </>
  ) : null;
};


export default Modal;

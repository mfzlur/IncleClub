import React from 'react';
import './Modal.css'; // <-- Import form styles



const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

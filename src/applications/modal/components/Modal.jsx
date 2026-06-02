import React, { useState } from "react";
import "./style.css";

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="app-container">
      <h3>Modal App</h3>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && (
        <div onClick={() => setShowModal(false)} className="modal-overlay">
          <div className="modal">
            <h3>Modal</h3>
            <p>I am description of Modal</p>
            <button className="cross" onClick={() => setShowModal(false)}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

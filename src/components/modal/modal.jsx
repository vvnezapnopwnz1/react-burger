import React from "react";
import modalStyles from "./modal.module.css";
import PropTypes from "prop-types";

function Modal({ children }) {
  return (
    <div className={modalStyles.modal}>
      {children}
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired
};

export default Modal;

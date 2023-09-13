import React from "react";
import { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";

export function Modal({ children }) {
  return createPortal(
    <ModalOverlay>
      <div className={modalStyles.modal}>{children}</div>
    </ModalOverlay>,
    document.body
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Modal;

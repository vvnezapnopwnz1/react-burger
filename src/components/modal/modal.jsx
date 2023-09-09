import React from "react";
import { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";

export function Modal({ children, handleModal }) {
  return createPortal(
    <ModalOverlay handleModal={handleModal}>
      <div className={modalStyles.modal}>{children}</div>
    </ModalOverlay>,
    document.body
  );
}

Modal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { closeModal } from "../../services/reducers/modalReducer";
import { useDispatch } from "react-redux";
export function Modal({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dispatch(closeModal());
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [dispatch]);

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

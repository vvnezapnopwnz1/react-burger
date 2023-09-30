import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { closeModal } from "../../services/reducers/modalReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export function Modal({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dispatch(closeModal());
        modal.ingredient && navigate(-1);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [dispatch, modal.ingredient, navigate]);

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

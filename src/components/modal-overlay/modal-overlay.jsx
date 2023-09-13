import React, { useEffect } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import { closeModal } from "../../services/reducers/modalReducer";
import { useDispatch } from "react-redux";

function ModalOverlay({ children }) {
  const dispatch = useDispatch();

  const handleCloseModal = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      dispatch(closeModal());
    }
  };

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

  return (
    <div
      className={modalOverlayStyles.modalOverlay}
      onClick={(e) => handleCloseModal(e)}
    >
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ModalOverlay;

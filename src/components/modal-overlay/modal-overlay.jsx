import React, { useEffect } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ children, handleModal }) {
  const closeModal = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      handleModal(false);
    }
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleModal(false);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [handleModal]);

  return (
    <div
      className={modalOverlayStyles.modalOverlay}
      onClick={(e) => closeModal(e)}
    >
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  handleModal: PropTypes.func.isRequired,
};

export default ModalOverlay;

import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import { closeModal } from "../../services/reducers/modalReducer";
import { useDispatch } from "react-redux";

function ModalOverlay({ children }) {
  const dispatch = useDispatch();

  const handleCloseModal = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      window.history.replaceState(null, "", "/");
      dispatch(closeModal());
    }
  };

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

import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import { closeModal } from "../../services/reducers/modalReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ModalOverlay({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modal = useSelector((state) => state.modal);

  const handleCloseModal = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      dispatch(closeModal());
      modal.ingredient && navigate(-1);
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

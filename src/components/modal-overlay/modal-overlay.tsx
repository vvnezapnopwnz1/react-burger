import React, { ReactNode, MouseEvent } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";
import { closeModal } from "../../services/reducers/modalReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../services/reducers";

type TModalOverlay = {
  children: ReactNode;
};

function ModalOverlay({ children }: TModalOverlay) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modal = useSelector((state: RootState) => state.modal);

  const handleCloseModal = (event: MouseEvent<HTMLDivElement>) => {
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

export default ModalOverlay;

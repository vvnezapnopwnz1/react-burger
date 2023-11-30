import React, { ReactNode, MouseEvent } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";
import { closeModal } from "../../services/reducers/modalReducer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useSelector } from "../../services/reducers";
import { resetOrderData } from "../../services/reducers/orderReducer";

type TModalOverlay = {
  children: ReactNode;
};

function ModalOverlay({ children }: TModalOverlay) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const modal = useSelector((state) => state.modal);

  const handleCloseModal = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      dispatch(resetOrderData());
      dispatch(closeModal());
      (modal.ingredient || modal.feedDetails) && navigate(-1);
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

import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { closeModal } from "../../services/reducers/modalReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../services/reducers";
import { resetOrderData } from "../../services/reducers/orderReducer";

type TModal = {
  children: ReactNode;
};
interface KeyboardEvent {
  key: string;
  preventDefault: Function;
}

export function Modal({ children }: TModal) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      event.preventDefault();
      dispatch(resetOrderData());
      dispatch(closeModal());
      modal.ingredient && navigate(-1);
    };

    document.addEventListener("keydown", (e: KeyboardEvent) =>
      keyDownHandler(e)
    );

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

export default Modal;

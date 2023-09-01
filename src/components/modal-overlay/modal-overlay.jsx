import React, { useEffect } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";
import Modal from "../modal/modal";
import PropTypes from "prop-types";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

function ModalOverlay({ modalData, handleModal }) {
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
      {modalData.order && (
        <Modal>
          <OrderDetails order={modalData.order} handleModal={handleModal} />
        </Modal>
      )}
      {modalData.item && (
        <Modal>
          <IngredientDetails item={modalData.item} handleModal={handleModal} />
        </Modal>
      )}
    </div>
  );
}

ModalOverlay.propTypes = {
  handleModal: PropTypes.func.isRequired,
  modalData: PropTypes.oneOfType([
    PropTypes.exact({
      order: PropTypes.string.isRequired,
    }),
    PropTypes.exact({
      item: PropTypes.string.isRequired,
    }),
    PropTypes.bool.isRequired,
  ]),
};

export default ModalOverlay;
